function googleMapPicker(config) {
    return {
        state: config.state,
        zoom: config.zoom,
        init: async function () {
            var center = {
                lat: this?.state?.lat || 0,
                lng: this?.state?.lng || 0
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
                console.log(this.state)
            });

            if (config.controls.searchBoxControl) {
                const { SearchBox } = await google.maps.importLibrary('places')
                const input = this.$refs.pacinput;
                const searchBox = new SearchBox(input);
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
                searchBox.addListener("places_changed", () => {
                    input.value = ''
                    this.state = searchBox.getPlaces()[0].geometry.location
                })
            }

            this.$watch('state', () => {
                let position = this.state
                marker.setPosition(position)
                map.panTo(position)
            })
        }
    }
}
