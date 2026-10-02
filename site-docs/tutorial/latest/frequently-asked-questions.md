# Frequently Asked Questions

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/90_FAQ.html

## Table of Contents

- [I get an access violation error in the core validation layer](#_i_get_an_access_violation_error_in_the_core_validation_layer)
- [I_get_an_access_violation_error_in_the_core_validation_layer](#_i_get_an_access_violation_error_in_the_core_validation_layer)
- [I don’t see any messages from the validation layers / Validation layers are not available](#_i_dont_see_any_messages_from_the_validation_layers_validation_layers_are_not_available)
- [I_don’t_see_any_messages_from_the_validation_layers_/_Validation_layers_are_not_available](#_i_dont_see_any_messages_from_the_validation_layers_validation_layers_are_not_available)
- [vkCreateSwapchainKHR triggers an error in SteamOverlayVulkanLayer64.dll](#_vkcreateswapchainkhr_triggers_an_error_in_steamoverlayvulkanlayer64_dll)
- [vkCreateSwapchainKHR_triggers_an_error_in_SteamOverlayVulkanLayer64.dll](#_vkcreateswapchainkhr_triggers_an_error_in_steamoverlayvulkanlayer64_dll)
- [vkCreateInstance fails with VK_ERROR_INCOMPATIBLE_DRIVER](#_vkcreateinstance_fails_with_vk_error_incompatible_driver)
- [vkCreateInstance_fails_with_VK_ERROR_INCOMPATIBLE_DRIVER](#_vkcreateinstance_fails_with_vk_error_incompatible_driver)

## Content

This page lists solutions to common problems that you may encounter while developing Vulkan applications.

Make sure that MSI Afterburner / RivaTuner Statistics Server is not running, because it has some compatibility problems with Vulkan.

First make sure that the validation layers get a chance to print errors by keeping the terminal open after your program exits.
You can do this from Visual Studio by running your program with Ctrl-F5 instead of F5, and on Linux by executing your program from a terminal window.
If there are still no messages and you are sure that validation layers are turned on, then you should ensure that your Vulkan SDK is correctly installed by following the "Verify the Installation" instructions [on this page](https://vulkan.lunarg.com/doc/view/1.3.280.0/windows/getting_started.html).
Also ensure that your SDK version is at least 1.1.106.0 to support the `VK_LAYER_KHRONOS_validation` layer.

This appears to be a compatibility problem in the Steam client beta.
There are a few possible workarounds:

* 
Opt out of the Steam beta program.

* 
Set the `DISABLE_VK_LAYER_VALVE_steam_overlay_1` environment variable to `1`

* 
Delete the Steam overlay Vulkan layer entry in the registry under `HKEY_LOCAL_MACHINE\SOFTWARE\Khronos\Vulkan\ImplicitLayers`

Example:

![steam layers env](_images/images/steam_layers_env.png)

If you are using MacOS with the latest MoltenVK SDK then `vkCreateInstance` may return the `VK_ERROR_INCOMPATIBLE_DRIVER` error.
This is because [Vulkan SDK version 1.3.216 or newer](https://vulkan.lunarg.com/doc/sdk/1.3.216.0/mac/getting_started.html) requires you to enable the `VK_KHR_PORTABILITY_subset` extension to use MoltenVK, because it is currently not fully conformant.

You have to add the `VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR` flag to your `VkInstanceCreateInfo` and add `VK_KHR_PORTABILITY_ENUMERATION_EXTENSION_NAME` to your instance extension list.

Code example:

...

std::vector requiredExtensions;

for(uint32_t i = 0; i (context, createInfo);
