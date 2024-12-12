export const speciesSchema = {
    name: "",
    sunExposureOption: {
       _id: "",
       label: ""
    },
    originRegion: "",
    recommendedTemperature: {
        min: null,
        max: null
},
    watering: {
        liters: null,
            period: null,
            wintering: {
            winteringOption: {
                _id: "",
                label: ""
            },
            dateFrom: null,
            dateTo: null
        }
    },
    overWateringSymptoms: [],
        dryingOutSymptoms: [],
}