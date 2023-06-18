<x-dynamic-component
    :component="$getFieldWrapperView()"
    :id="$getId()"
    :label="$getLabel()"
    :label-sr-only="$isLabelHidden()"
    :helper-text="$getHelperText()"
    :hint="$getHint()"
    :hint-action="$getHintAction()"
    :hint-color="$getHintColor()"
    :hint-icon="$getHintIcon()"
    :required="$isRequired()"
    :state-path="$getStatePath()">
    <div wire:ignore x-data="googleMapPicker({
            @if ($attributes->get('wire:model'))
                value: @entangle($getName()){{ $attributes->get('wire:model') }},
            @endif
            zoom: {{$getDefaultZoom()}},
            controls: {{$getMapControls()}}
        })" x-init="init()">
        @if($isSearchBoxControlEnabled())
        <input x-ref="pacinput" type="text" placeholder="Search Box" style="top: 10px; width: 50%;" />
        @endif
        <div x-ref="map" class="w-full" style="min-height: 40vh"></div>
    </div>
</x-dynamic-component>
