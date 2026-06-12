# Layers

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/layers.html

## Table of Contents

- [Configuring Layers](#_configuring_layers)
- [Layers settings backward compatbility policy](#_layers_settings_backward_compatbility_policy)
- [Layers_settings_backward_compatbility_policy](#_layers_settings_backward_compatbility_policy)
- [Device Layers Deprecation](#_device_layers_deprecation)
- [Device_Layers_Deprecation](#_device_layers_deprecation)
- [Creating a Layer](#_creating_a_layer)
- [Creating_a_Layer](#_creating_a_layer)
- [Android](#_android)

## Content

Layers are optional components that augment the Vulkan system, packaged as shared libraries that get dynamically loaded in by the loader. They can intercept, evaluate, and modify existing Vulkan functions on their way from the application down to the hardware.

For example, by design, minimal error checking is done inside a Vulkan driver, [*Vulkan Validation* layer](https://vulkan.lunarg.com/doc/sdk/latest/windows/khronos_validation_layer.html) can be used to to assist developers in isolating incorrect usage, and in verifying that applications correctly use the API.

Layers are packaged as shared libraries that get dynamically loaded in by the loader and inserted between it and the application.

The layers can be either explicitly enabled or implicitly enabled. More details about implicit and explicit layers can be found in the [Loader and Layer Interface](https://github.com/KhronosGroup/Vulkan-Loader/blob/main/docs/LoaderApplicationInterface.md#implicit-vs-explicit-layers).

A *layers configuration* consists in two operations:
- Selecting and ordering layers
- Configuring each layer themselves using settings

Layers can be configured using three different methods to match specific Vulkan developers' workflows:
- Using environment variables: [Loader environment variables](https://github.com/KhronosGroup/Vulkan-Loader/blob/main/docs/LoaderInterfaceArchitecture.md) and [per-layer settings environment variables](https://github.com/KhronosGroup/Vulkan-Utility-Libraries/blob/main/docs/layer_configuration.md#layer-settings-environment-variables)
- Using dedicated Vulkan system files: [`vk_loader_settings.json`](https://github.com/KhronosGroup/Vulkan-Loader/blob/main/docs/LoaderSettingsFile.md) and [`vk_layer_settings.txt`](https://github.com/KhronosGroup/Vulkan-Utility-Libraries/blob/main/docs/layer_configuration.md#configuring-the-layers-using-the-settings-file-vk_layer_settingstxt)
- Using the Vulkan API, programmably in the Vulkan application: [`vkCreateInstance`](https://docs.vulkan.org/refpages/latest/refpages/source/vkCreateInstance.html) and [`VK_EXT_layer_settings`](https://github.com/KhronosGroup/Vulkan-Utility-Libraries/blob/main/docs/layer_configuration.md#configuring-the-layer-settings-using-vk_ext_layer_settings)

[*Vulkan Configurator*](https://vulkan.lunarg.com/doc/sdk/latest/windows/vkconfig.html) simplifies the usage of these three methods. Using the graphical user interface, we can create *layers configuration*. The tool automatically create and locate the `vk_loader_settings.json` and `vk_layer_settings.txt` files. It can also be used to generate environment variables scripts and a C++ header library that can be directly included within the Vulkan application code.

The [Layer Configuration](https://github.com/KhronosGroup/Vulkan-Utility-Libraries/blob/main/docs/layer_configuration.md) document is providing details on layer configuration.

Settings which are unknown by the layer will be ignored independently of the method. It’s the responsibility of the layer developer to ensure backward compatibility with previous versions of the layer.

This is to ensure the list of layer settings remain relatively stable across versions and that the responsibility of handling layer backward compatibility doesn’t fall on Vulkan application developers as this could quickly become untrackable.

There used to be both instance layers and device layers, but device layers were [deprecated](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-layers-devicelayerdeprecation) early in Vulkan’s life and should be avoided.

Anyone can create a layer as long as it follows the [loader to layer interface](https://github.com/KhronosGroup/Vulkan-Loader/blob/main/docs/LoaderApplicationInterface.md#loader-and-layer-interface) which is how the loader and layers agree to communicate with each other.

To ensure consistency and a smooth integration with Vulkan Configurator and other SDK tools, the [Vulkan::LayerSettings](https://github.com/KhronosGroup/Vulkan-Utility-Libraries) should be used by the layer implementation.

As of Android P (Android 9 / API level 28), if a device is in a debuggable state such that `getprop ro.debuggable` [/data/local/debug/vulkan](https://cs.android.com/android/platform/superproject//android-9.0.0_r1:frameworks/native/vulkan/libvulkan/layers_extensions.cpp;l=454[returns 1], then the loader will look in link:https://cs.android.com/android/platform/superproject//android-9.0.0_r1:frameworks/native/vulkan/libvulkan/layers_extensions.cpp;l=67).

Starting in Android P (Android 9 / API level 28) implicit layers can be [pushed using ADB](https://developer.android.com/ndk/guides/graphics/validation-layer#vl-adb) if the application was built in debug mode.

There is no way other than the options above to use implicit layers.
