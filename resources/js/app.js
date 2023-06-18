function googleMapPicker(config) {
    return {
        value: config.value,
        zoom: config.zoom,
        init: async function () {
            var center = {
                lat: this?.value?.lat || 0,
                lng: this?.value?.lng || 0
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
                this.value = event.latLng.toJSON();
            });

            if (config.controls.searchBoxControl) {
                const { SearchBox } = await google.maps.importLibrary('places')
                const input = this.$refs.pacinput;
                const searchBox = new SearchBox(input);
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
                searchBox.addListener("places_changed", () => {
                    input.value = ''
                    this.value = searchBox.getPlaces()[0].geometry.location
                })
            }

            this.$watch('value', () => {
                let position = this.value
                marker.setPosition(position)
                map.panTo(position)
            })
        }

    }
}
