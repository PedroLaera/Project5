import { Request, Response } from "express";
import  Order  from "../models/OrderModel";
import  OrderProduct  from "../models/OrderProduct";
import  Product  from "../models/ProductModel";
import ShippingMethod from "../models/ShippingMethodModel";
import sequelize from "../config/database";
import { AuthRequest } from "../middleware/authMiddleware";

// Adicionar produto ao carrinho (sem criar pedido ainda)

const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity, user } = req.body;

    // console.log('usuario que chegou do token pelo middleware', req.body.user)
    // const userId = req.body.user?.id_user

    if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }
  
    // Verifica se o produto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

        // Verifica se o usuário já tem um pedido ativo (status "aberto")
        let order = await Order.findOne({
          where: { id_user: user, status: "CART"},
        });
    
        // Se não houver pedido, cria um novo
        if (!order) {
          order = await Order.create({
            id_user: user.id_user,
            status: "CART", // Status inicial do pedido
            orderDate: new Date(),
            totalAmount: 0, 
            shippingFee: 0,
          });
        }

    // Verifica se o item já está no carrinho do usuário
    const existingItem = await OrderProduct.findOne({
      where: {
        id_order: order.id_order, // Ainda sem pedido
        id_product: productId,
        id_user: user, // Relacionado ao usuário
      },
    });

    if (existingItem) {
      // Atualiza a quantidade
      existingItem.setDataValue(
        "quantity",
        existingItem.getDataValue("quantity") + quantity
      );
      await existingItem.save();
      return res.status(200).json({ message: "Quantidade atualizada no carrinho", item: existingItem });
    } else {
      // Adiciona novo item ao carrinho
      const newItem = await OrderProduct.create({
        id_order: order.id_order, // Ainda sem pedido
        id_product: productId,
        id_user: user,
        quantity: quantity,
      });
      return res.status(201).json({ message: "Produto adicionado ao carrinho", item: newItem });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao adicionar ao carrinho" });
  }
};


// Obter os itens do carrinho do usuário
const getCartItems = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Busca os itens no carrinho do usuário (sem pedido associado)
    const cartItems = await OrderProduct.findAll({
      where: { id_order: null, userId },
      include: [{ model: Product, attributes: ["id_product", "name", "price"] }],
    });

    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao obter itens do carrinho" });
  }
};

// Finalizar o checkout e criar a ordem
const finalizeCheckout = async (req: Request, res: Response) => {
  const { userId, shippingMethodId, discount = 0 } = req.body;

  const transaction = await sequelize.transaction(); // Inicia transação

  try {

    const shippingMethod = await ShippingMethod.findByPk(shippingMethodId);
    if (!shippingMethod) {
      return res.status(400).json({ error: "Método de envio inválido" });
    }

    // Obtém os itens do carrinho do usuário
    const cartItems = await OrderProduct.findAll({
      where: { id_order: null, userId },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: "O carrinho está vazio" });
    }

    // Calcula o total do pedido
    let totalAmount = 0;
    for (const item of cartItems) {
      const product = await Product.findByPk(item.id_product);
      if (product) {
        totalAmount += product.price * item.quantity;
      }
    }

    // Cria o pedido
    const newOrder = await Order.create(
      {
        id_user: userId,
        orderDate: new Date(),
        totalAmount: totalAmount - discount,
        shippingFee: 10.0, // Valor fixo ou calculado
        status: "PENDING",
        id_shippingMethod: shippingMethodId,
        discount: discount,
      },
      { transaction }
    );

    // Atualiza os itens do carrinho, associando ao pedido criado
    await OrderProduct.update(
      { id_order: newOrder.id_order },
      { where: { id_order: null, userId }, transaction }
    );

    await transaction.commit(); // Confirma a transação

    return res.status(201).json({ message: "Pedido criado com sucesso", order: newOrder });
  } catch (error) {
    await transaction.rollback(); // Desfaz alterações se houver erro
    console.error(error);
    return res.status(500).json({ error: "Erro ao finalizar o checkout" });
  }
};

export { addToCart, getCartItems, finalizeCheckout };
