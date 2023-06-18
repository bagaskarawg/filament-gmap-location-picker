<?php

namespace Sadiq\GMapLocationPicker;

use Filament\PluginServiceProvider;
use Spatie\LaravelPackageTools\Package;

class GmapLocationPickerServiceProvider extends PluginServiceProvider
{
    protected array $beforeCoreScripts = [
        'gmap-script' => __DIR__ . '/../resources/js/map.js',
        'gmap-location-picker-script' => __DIR__ . '/../resources/js/app.js',
    ];

    public function configurePackage(Package $package): void
    {
        $package->name('gmap-location-picker')
            ->hasViews();
    }

    protected function getScriptData(): array
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/gmap-location-picker.php', 'gmap-location-picker');

        return [
            'googleMapKey' => config('gmap-location-picker.key'),
        ];
    }
}
