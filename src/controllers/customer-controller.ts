import express from 'express';
import * as service from '../services/customer-service';

const router = express.Router();

router.get('/list', (_req, res) => {
  res.status(200).send(service.getCustomers());
});

router.post('/add', (req, res) => {
  try {
    const newCustomer = service.getNewCustomer(req.body);
    const addedCustomer = service.addCustomer(newCustomer);
    res
      .status(200)
      .json({ data: addedCustomer, message: 'Customer created successfully!' });
  } catch (e: any) {
    if (e instanceof Error) res.status(400).json({ message: e.message });
    else res.sendStatus(400);
  }
});

router.put('/update', (req, res) => {
  try {
    const editCustomer = service.getEditCustomer(req.body);
    const updateCustomer = service.updateCustomer(editCustomer);
    res.status(200).json({
      data: updateCustomer,
      message: 'Customer edited successfully!',
    });
  } catch (e: any) {
    if (e instanceof Error) {
      let code = e.message.includes('not found') ? 404 : 400;
      res.status(code).json({ message: e.message });
    } else res.sendStatus(400);
  }
});

router.delete('/delete/:id', (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const deletedCustomer = service.deleteCustomer(id);
    res.status(200).json({
      data: deletedCustomer,
      message: 'Customer successfully deleted!',
    });
  } catch (e: any) {
    if (e instanceof Error) {
      let code = e.message.includes('not found') ? 404 : 400;
      res.status(code).json({ message: e.message });
    } else res.sendStatus(400);
  }
});

export default router;
