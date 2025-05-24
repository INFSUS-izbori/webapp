class Party {
    constructor(id, name, description, dateOfEstablishment, logo, createdDate) {
        this.id = id
        this.name = name
        this.description = description
        this.dateOfEstablishment = dateOfEstablishment
        this.logo = logo // Base64 string
        this.createdDate = createdDate
    }

    // Example method:
    getDisplayInfo() {
        return `${this.name} (Established: ${this.dateOfEstablishment})`
    }
}

export default Party
