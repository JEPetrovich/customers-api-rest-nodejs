<h2>Ejecución de API Rest</h2>

<p>Para levantar el servicio, se ejecutaran los siguientes comandos con la terminal ubicada dentro de la carpeta del proyecto:</p>

```npm
    npm install
    npm run tsc
    npm run start
```

<p>Se debe tener en cuenta que por defecto se ejecuta en localhost en el puerto 8080.</p>

<h3>Acerca de la prueba de endpoints</h3>

<p>Para probar los endpoints disponibles, se recomienda instalar la extensión 'Thunder Client' de VSCode e importar la colección correspondientes al modelo 'Customer' con las peticiones ya armadas para su prueba, dicha colección se encuentra en el path "src/thunder-client/customers-collection.json".</p>

<p>El formato de los usuarios obtenidos es el siguiente:</p>

```typescript
interface Customer {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  birth_date?: string;
  create_date?: string;
}
```

<h2>Endpoints</h2>

<p><b>api/customer/list</b> | Devuelve un array con todos los clientes disponibles:</p>

```typescript
router.get('/list', (_req, res) => {
  res.status(200).send(service.getCustomers());
});
```

<p><b>api/customer/add</b> | Crea un cliente, recibiendo un json por el body con el siguiente formato:</p>

```typescript
interface AddCustomer {
  firstName: string;
  lastName: string;
  email: string;
  birth_date: string; // date-pattern: YYYY-mm-dd HH:mm:ss
}
```

```typescript
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
```

<p><b>api/customer/update</b> | Actualiza un cliente recibiendo un json por el body con el siguiente formato:</p>

```typescript
interface EditCustomer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birth_date: string; // date-pattern: YYYY-mm-dd HH:mm:ss
}
```

```typescript
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
```

<p><b>api/customer/delete/:id</b> | Recibe como path-var el 'id' del cliente a eliminar:</p>

```typescript
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
```
