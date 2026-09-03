# Vulkan Validation Overview

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/validation_overview.html

## Table of Contents

- [Valid Usage (VU)](#_valid_usage_vu)
- [Valid_Usage_(VU)](#_valid_usage_vu)
- [Undefined Behavior](#_undefined_behavior)
- [Undefined Value](#_undefined_value)
- [Valid Usage ID (VUID)](#_valid_usage_id_vuid)
- [Valid_Usage_ID_(VUID)](#_valid_usage_id_vuid)
- [Implicit vs Explicit](#_implicit_vs_explicit)
- [Implicit_vs_Explicit](#_implicit_vs_explicit)
- [Khronos Validation Layer](#khronos-validation-layer)
- [Khronos_Validation_Layer](#khronos-validation-layer)
- [Getting Validation Layers](#_getting_validation_layers)
- [Getting_Validation_Layers](#_getting_validation_layers)
- [Breaking Down a Validation Error Message](#_breaking_down_a_validation_error_message)
- [Breaking_Down_a_Validation_Error_Message](#_breaking_down_a_validation_error_message)
- [Special Usage Tags](#_special_usage_tags)
- [Special_Usage_Tags](#_special_usage_tags)

## Content

|  | The purpose of this section is to give a full overview of how Vulkan deals with *valid usage* of the API. |
| --- | --- |

A **VU** is explicitly [defined in the Vulkan Spec](https://docs.vulkan.org/spec/latest/chapters/fundamentals.html#fundamentals-validusage) as:

|  | set of conditions that **must** be met in order to achieve well-defined run-time behavior in an application. |
| --- | --- |

One of the main advantages of Vulkan, as an explicit API, is that the implementation (driver) doesn’t waste time checking for valid input. In OpenGL, the implementation would have to always check for valid usage which added noticeable overhead. There is no [glGetError](https://www.khronos.org/opengl/wiki/OpenGL_Error) equivalent in Vulkan.

The valid usages will be listed in the spec after every function and structure. For example, if a VUID checks for an invalid `VkImage` at `VkBindImageMemory` then the valid usage in the spec is found under `VkBindImageMemory`. This is because the Validation Layers will only know about all the information at `VkBindImageMemory` during the execution of the application.

When an application supplies invalid input, according to the valid usages in the spec, the result is *undefined behavior*. In this state, Vulkan makes no guarantees as [anything is possible with undefined behavior](https://raphlinus.github.io/programming/rust/2018/08/17/undefined-behavior.html).

**VERY IMPORTANT**: While undefined behavior might seem to work on one implementation, there is a good chance it will fail on another.

There are few spots that will be *undefined value*. These are situation where it is not invalid to do something, but the value returned from the hardware might be garbage. Imagine the following code

int x;
print(x)

It will never crash, but the value can be anything and relying on the undefined value to be something like `0` is dangerous.

A `VUID` is an unique ID given to each valid usage. This allows a way to point to a valid usage in the spec easily.

Using `VUID-vkBindImageMemory-memoryOffset-01046` as an example, it is as simple as adding the VUID to an anchor in the HTML version of the spec ([vkspec.html#VUID-vkBindImageMemory-memoryOffset-01046](https://docs.vulkan.org/spec/latest/chapters/resources.html#VUID-vkBindImageMemory-memoryOffset-01046)) and it will jump right to the VUID.

*Implicit Validation* is the validation that is generated from the `vk.xml`. It will be the "obvious" things such as "`device` must be a valid `VkDevice` handle".

*Explicit Validation* are the handwritten VUs found everywhere else

Simple way to detect which is which is by looking for a number in the VUID

* 
`VUID-vkBindImageMemory-image-01044` is explicit

* 
`VUID-vkBindImageMemory-memory-parameter` is implicit

Since Vulkan doesn’t do any error checking, it is **very important**, when developing, to enable the [Validation Layers](https://github.com/KhronosGroup/Vulkan-ValidationLayers) right away to help catch invalid behavior. Applications should also never ship the Validation Layers with their application as they noticeably reduce performance and are designed for the development phase.

|  | The Khronos Validation Layer used to consist of multiple layers but now has been unified to a single `VK_LAYER_KHRONOS_validation` layer. [More details explained in LunarG’s whitepaper](https://www.lunarg.com/wp-content/uploads/2019/04/UberLayer_V3.pdf). |
| --- | --- |

The Validation Layers are constantly being updated and improved so it is always possible to grab the source and [build it yourself](https://github.com/KhronosGroup/Vulkan-ValidationLayers/blob/main/BUILD.md). In case you want a prebuilt version there are various options for all supported platforms:

* 
**Android** - Binaries are [released on GitHub](https://github.com/KhronosGroup/Vulkan-ValidationLayers/releases) with most up to date version. The NDK will also comes with the Validation Layers built and [information on how to use them](https://developer.android.com/ndk/guides/graphics/validation-layer).

* 
**Linux** - The [Vulkan SDK](https://vulkan.lunarg.com/sdk/home) comes with the Validation Layers built and instructions on how to use them on [Linux](https://vulkan.lunarg.com/doc/sdk/latest/linux/khronos_validation_layer.html).

* 
**MacOS** - The [Vulkan SDK](https://vulkan.lunarg.com/sdk/home) comes with the Validation Layers built and instructions on how to use them on [MacOS](https://vulkan.lunarg.com/doc/sdk/latest/mac/khronos_validation_layer.html).

* 
**Windows** - The [Vulkan SDK](https://vulkan.lunarg.com/sdk/home) comes with the Validation Layers built and instructions on how to use them on [Windows](https://vulkan.lunarg.com/doc/sdk/latest/windows/khronos_validation_layer.html).

This information can be found in the [Validation Layers documentation](https://github.com/KhronosGroup/Vulkan-ValidationLayers/blob/main/docs/error_messages.md).

The [Best Practices layer](https://vulkan.lunarg.com/doc/sdk/latest/windows/best_practices.html) will produce warnings when an application tries to use any extension with [special usage tags](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse). An example of such an extension is [VK_EXT_transform_feedback](extensions/translation_layer_extensions.html#vk_ext_transform_feedback) which is only designed for emulation layers. If an application’s intended usage corresponds to one of the special use cases, the following approach will allow you to ignore the warnings.

Ignoring Special Usage Warnings with `VK_EXT_debug_report`

VkBool32 DebugReportCallbackEXT(/* ... */ const char* pMessage /* ... */)
{
    // If pMessage contains "specialuse-extension", then exit
    if(strstr(pMessage, "specialuse-extension") != NULL) {
        return VK_FALSE;
    }

    // Handle remaining validation messages
}

Ignoring Special Usage Warnings with `VK_EXT_debug_utils`

VkBool32 DebugUtilsMessengerCallbackEXT(/* ... */ const VkDebugUtilsMessengerCallbackDataEXT* pCallbackData /* ... */)
{
    // If pMessageIdName contains "specialuse-extension", then exit
    if(strstr(pCallbackData->pMessageIdName, "specialuse-extension") != NULL) {
        return VK_FALSE;
    }

    // Handle remaining validation messages
}
