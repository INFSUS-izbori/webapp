class Candidate {
    constructor(id, oib, name, image, description, partyId, createdDate) {
        this.id = id
        this.oib = oib
        this.name = name
        this.image = image // Base64 string
        this.description = description
        this.partyId = partyId
        this.createdDate = createdDate
    }

    // Example method:
    getFullName() {
        return this.name
    }
}

export default Candidate
