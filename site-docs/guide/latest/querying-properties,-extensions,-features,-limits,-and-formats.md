# Querying Properties, Extensions, Features, Limits, and Formats

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/querying_extensions_features.html

## Table of Contents

- [Properties](#_properties)
- [Extensions](#_extensions)
- [Features](#_features)
- [Limits](#_limits)
- [Formats](#_formats)
- [Tools](#_tools)

## Content

One of Vulkan’s main features is that is can be used to develop on multiple platforms and devices. To make this possible, an application is responsible for querying the information from each physical device and then basing decisions on this information.

The items that can be queried from a physical device

* 
Properties

* 
Features

* 
Extensions

* 
Limits

* 
Formats

There are many other components in Vulkan that are labeled as properties. The term “properties” is an umbrella term for any read-only data that can be queried.

|  | Check out the [Enabling Extensions](enabling_extensions.html#enabling-extensions) chapter for more information.
| --- | --- |

There is a [Registry](https://registry.khronos.org/vulkan/#repo-docs) with all available extensions. |

There are many times when a set of new functionality is desired in Vulkan that doesn’t currently exist. Extensions have the ability to add new functionality. Extensions may define new Vulkan functions, enums, structs, or feature bits. While all of these extended items are found by default in the Vulkan Headers, it is **undefined behavior** to use extended Vulkan if the [extensions are not enabled](enabling_extensions.html#enabling-extensions).

|  | Checkout the [Enabling Features](enabling_features.html#enabling-features) chapter for more information. |
| --- | --- |

Features describe functionality which is not supported on all implementations. Features can be [queried](https://docs.vulkan.org/spec/latest/chapters/features.html#vkGetPhysicalDeviceFeatures) and then enabled when creating the `VkDevice`. Besides the [list of all features](https://docs.vulkan.org/spec/latest/chapters/features.html), some [features are mandatory](https://docs.vulkan.org/spec/latest/chapters/features.html#features-requirements) due to newer Vulkan versions or use of extensions.

A common technique is for an extension to expose a new struct that can be passed through `pNext` that adds more features to be queried.

Limits are implementation-dependent minimums, maximums, and other device characteristics that an application may need to be aware of. Besides the [list of all limits](https://docs.vulkan.org/spec/latest/chapters/limits.html), some limits also have [minimum/maximum required values](https://docs.vulkan.org/spec/latest/chapters/limits.html#limits-minmax) guaranteed from a Vulkan implementation.

Vulkan provides many `VkFormat` that have multiple `VkFormatFeatureFlags` each holding a various [VkFormatFeatureFlagBits](https://registry.khronos.org/vulkan/specs/latest/man/html/VkFormatFeatureFlagBits.html) bitmasks that can be queried.

Checkout the [Format chapter](formats.html#feature-support) for more information.

There are a few tools to help with getting all the information in a quick and in a human readable format.

`vulkaninfo` is a command line utility for Windows, Linux, and macOS that enables you to see all the available items listed above about your GPU. Refer to the [Vulkaninfo documentation](https://vulkan.lunarg.com/doc/sdk/latest/windows/vulkaninfo.html) in the Vulkan SDK.

The [Vulkan Hardware Capability Viewer](https://play.google.com/store/apps/details?id=de.saschawillems.vulkancapsviewer&hl=en_US) app developed by Sascha Willems, is an Android app to display all details for devices that support Vulkan.
