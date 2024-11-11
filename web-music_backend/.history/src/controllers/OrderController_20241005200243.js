
const OrderService = require("../service/OrderService");

const createOrder = async (req, res) => {
    try {
        const response = await OrderService.createOrder(req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const updateOrder = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await OrderService.updateOrder(id, req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const getAllOrders = async (req, res) => {
   
    try {
        const {sort,filter } = req.query
        const response = await OrderService.getAllOrders(sort,filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving Orders',
            err: error.message,
        });
    }
};

const getByUserId = async (req, res) => {
    const { userId } = req.params; 
    try {
        const response = await OrderService.getByUserId(userId); 
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        });
    }
};


const deleteOrder = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await OrderService.deleteOrder(id);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

module.exports = {
    createOrder,
    updateOrder,
    getAllOrders,
    deleteOrder,
    getByUserId
};
