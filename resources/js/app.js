function googleMapPicker(config) {
    const state = {
        lat: config.state.initialValue ? config.state.initialValue.coordinates[0] : config?.center?.lat || 0,
        lng: config.state.initialValue ? config.state.initialValue.coordinates[1] : config?.center?.lng || 0,
    }

    return {
        state,
        wireState: config.state,
        zoom: config.zoom,
        init: async function () {
            var center = {
                lat: this?.state?.lat || config?.center?.lat || 0,
                lng: this?.state?.lng || config?.center?.lng || 0
            }

            const { Map } = await google.maps.importLibrary('maps');
            var map = new Map(this.$refs.map, {
                center: center,
                zoom: this.zoom,
                zoomControl: false,
                ... config.controls
            })

            const { Marker } = await google.maps.importLibrary('marker');
            var marker = new Marker({
                position: center,
                map
            })

            map.addListener('click', (event) => {
                this.state = event.latLng.toJSON();
            });

            if (config.controls.searchBoxControl) {
                const { SearchBox } = await google.maps.importLibrary('places')
                const input = this.$refs.pacinput;
                const searchBox = new SearchBox(input);
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
                searchBox.addListener("places_changed", () => {
                    input.value = ''
                    const coordination = searchBox.getPlaces()[0].geometry.location;
                    this.state = {lat: coordination.lat(), lng: coordination.lng()};
                })
            }

            this.$watch('state', () => {
                let position = this.state;
                marker.setPosition(position)
                map.panTo(position)

                this.wireState = this.state;
            })
        }
    }
}
