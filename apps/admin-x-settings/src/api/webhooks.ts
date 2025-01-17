import {IntegrationsResponseType, integrationsDataType} from './integrations';
import {Meta, createMutation} from '../utils/apiRequests';

// Types

export type Webhook = {
    id: string;
    event: string;
    target_url: string;
    name: string;
    secret: string | null;
    api_version: string;
    integration_id: string;
    last_triggered_at: string | null;
    last_triggered_status: string | null;
    last_triggered_error: string | null;
    created_at: string;
    updated_at: string;
}

export interface WebhooksResponseType {
    meta?: Meta;
    webhooks: Webhook[];
}

// Requests

export const useCreateWebhook = createMutation<WebhooksResponseType, Partial<Webhook>>({
    method: 'POST',
    path: () => '/webhooks/',
    body: webhook => ({webhooks: [webhook]}),
    updateQueries: {
        dataType: integrationsDataType,
        update: (newData, currentData) => ({
            ...(currentData as IntegrationsResponseType),
            integrations: (currentData as IntegrationsResponseType).integrations.map((integration) => {
                const webhook = newData.webhooks[0];

                if (webhook.integration_id === integration.id) {
                    return {...integration, webhooks: [...integration.webhooks, webhook]};
                }

                return integration;
            })
        })
    }
});

export const useEditWebhook = createMutation<WebhooksResponseType, Webhook>({
    method: 'PUT',
    path: webhook => `/webhooks/${webhook.id}/`,
    body: webhook => ({webhooks: [webhook]}),
    updateQueries: {
        dataType: integrationsDataType,
        update: (newData, currentData) => ({
            ...(currentData as IntegrationsResponseType),
            integrations: (currentData as IntegrationsResponseType).integrations.map(integration => ({
                ...integration,
                webhooks: integration.webhooks.map(webhook => (
                    webhook.id === newData.webhooks[0].id ? newData.webhooks[0] : webhook
                ))
            }))
        })
    }
});

export const useDeleteWebhook = createMutation<unknown, string>({
    method: 'DELETE',
    path: id => `/webhooks/${id}/`,
    updateQueries: {
        dataType: integrationsDataType,
        update: (_, currentData, id) => ({
            ...(currentData as IntegrationsResponseType),
            integrations: (currentData as IntegrationsResponseType).integrations.map(integration => ({
                ...integration,
                webhooks: integration.webhooks.filter(webhook => webhook.id !== id)
            }))
        })
    }
});
