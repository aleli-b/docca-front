import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

export const AdminTable = ({ users, handleUserBanState }) => {
    
    //HAY QUE AÑADIR INDEX AL BACKEND, PARA MEJORAR LA UI

    const columns = [
        { field: 'num', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'Nombre', width: 200 },
        { field: 'lastName', headerName: 'Apellido', width: 200 },
        {
            field: 'age',
            headerName: 'Edad',
            type: 'number',
            width: 200,
        },
        {
            field: 'fullName',
            headerName: 'Nombre Completo',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 200,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        { field: 'admin', headerName: 'Administrador', width: 200 },
        { field: 'userType', headerName: 'Tipo de Usuario', width: 200 },
        { field: 'category', headerName: 'Especialidad', width: 200 },
        { field: 'banned', headerName: 'Inhabilitado', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                params.row.banned ?
                    <Button variant="outlined" color="secondary" onClick={() => handleUserBanState(params.row.id)}>
                        Inhabilitado
                    </Button>
                    :
                    <Button variant="outlined" color="primary" onClick={() => handleUserBanState(params.row.id)}>
                        Inhabilitar
                    </Button>
            ),
        },
    ];

    const rows = users.map((user, i) => ({
        id: user.id,
        num: i + 1,
        lastName: user.lastName,
        firstName: user.name,
        age: user.age,
        banned: user.banned,
        admin: user.admin,
        userType: user.userType[0].toUpperCase() + user.userType.substring(1),
        category: user.category ? user.category[0].toUpperCase() + user.category.substring(1) : '-',
        actions: () => handleUserBanState(user.id)
    }));

    return (
        <Box sx={{ height: 400, width: '100%', padding: 2 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },                    
                }}
                pageSizeOptions={[5, 10]}
            />
        </Box>
    );
}