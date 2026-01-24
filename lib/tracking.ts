// Mock tracking service - substituir pela API real depois
export interface TrackingUpdate {
    status: string
    location: string
    description: string
    timestamp: Date
}

export async function getTrackingInfo(trackingCode: string): Promise<TrackingUpdate[]> {
    // Mock implementation - substituir pela API real
    return [
        {
            status: 'Pedido Recebido',
            location: 'São Paulo, SP',
            description: 'Seu pedido foi recebido e está sendo preparado',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
            status: 'Em Separação',
            location: 'Centro de Distribuição - SP',
            description: 'Produtos em processo de separação',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
        {
            status: 'Enviado',
            location: 'Em trânsito',
            description: 'Pedido enviado para transportadora',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        },
    ]
}

export async function createTracking(orderId: string): Promise<string> {
    // Gera código de rastreamento mock
    const trackingCode = `BR${Date.now().toString().slice(-10)}`
    return trackingCode
}
