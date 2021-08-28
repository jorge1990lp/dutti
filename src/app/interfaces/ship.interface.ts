export interface ShipsResponse {
    count: Number,
    next: String,
    previous: String,
    results: Array<Ship>
}

export interface Ship {
    name: String,
    model: String,
    manufacturer: String,
    cost_in_credits: String,
    length: String,
    max_atmosphering_speed: String,
    crew: String,
    passengers: String,
    cargo_capacity: String,
    consumables: String,
    hyperdrive_rating: String,
    MGLT: String,
    starship_class: String,
    pilots: Array<any>,
    films: Array<String>,
    created: Date,
    edited: Date,
    url: String
}