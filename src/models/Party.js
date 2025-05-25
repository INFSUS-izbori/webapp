class Party {
    constructor(id, name, description, dateOfEstablishment, logo, createdDate) {
        this.id = id
        this.name = name
        this.description = description
        this.dateOfEstablishment = dateOfEstablishment
        this.logo = logo
        this.createdDate = createdDate
    }

    getDisplayInfo() {
        return `${this.name} (Established: ${this.dateOfEstablishment})`
    }
}

export default Party
