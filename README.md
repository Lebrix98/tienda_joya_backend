# Tienda de Joyas - Backend

Method GET /

    Query => Select * from inventario order by %s %s offset %s limit %s

        Query Parameters => Limit, Order_by and Page (Default Values)

        HATEOAS =>
            totalJoyas: ""
            stockTotal: ""
            results: []

Method GET /filtros

    Query => Select * from inventario where *Filter* and ...

        Query Parameters => precio_max, precio_min, categoria and metal

