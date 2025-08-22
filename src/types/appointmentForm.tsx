import type { CreateAppointmentRequest, UpdateAppointmentRequest, Appointment } from './appointment';

// Base props που είναι κοινά
interface BaseAppointmentFormProps {
    loading?: boolean;
    error?: string | null;
}

// Props για create
export interface CreateAppointmentFormProps extends BaseAppointmentFormProps {
    mode: 'create';
    appointment?: never; // Explicitly not allowed
    onSubmit: (data: CreateAppointmentRequest) => Promise<void>;
}

// Props για edit
export interface EditAppointmentFormProps extends BaseAppointmentFormProps {
    mode: 'edit';
    appointment: Appointment; // Required
    onSubmit: (data: UpdateAppointmentRequest) => Promise<void>;
}


export type AppointmentFormProps = CreateAppointmentFormProps | EditAppointmentFormProps;

// Type guards για runtime checking
export const isCreateMode = (props: AppointmentFormProps): props is CreateAppointmentFormProps => {
    return props.mode === 'create';
};

export const isEditMode = (props: AppointmentFormProps): props is EditAppointmentFormProps => {
    return props.mode === 'edit';
};