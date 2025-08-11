
export interface MovementData {
    id: string ;
    box_id?: string;
    movement_type?: string;
    user_id?:string;
    company_id?: string;
    from_location?:string;
    to_location?: string;
    movement_date?: Date
    related_order?: string;
    notes: string
}




export interface MovementFormData extends Partial<MovementData>{}