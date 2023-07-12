import { Card, Typography } from '@mui/material'
import React from 'react'

export const FilterSideBar = () => {
    return (
        <Card sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h3'>Filtrar Por:</Typography>
        </Card>
    )
}
