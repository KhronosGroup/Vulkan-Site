# vkGetDeviceProcAddr(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceProcAddr.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceProcAddr - Return a function pointer for a command

In order to support systems with multiple Vulkan implementations, the
function pointers returned by [vkGetInstanceProcAddr](vkGetInstanceProcAddr.html) **may** point to
dispatch code that calls a different real implementation for different
[VkDevice](VkDevice.html) objects or their child objects.
The overhead of the internal dispatch for [VkDevice](VkDevice.html) objects can be
avoided by obtaining device-specific function pointers for any commands that
use a device or device-child object as their dispatchable object.
Such function pointers **can** be obtained by calling:

// Provided by VK_VERSION_1_0
PFN_vkVoidFunction vkGetDeviceProcAddr(
    VkDevice                                    device,
    const char*                                 pName);

The table below defines the various use cases for `vkGetDeviceProcAddr`
and expected return value (“fp” is “function pointer”) for each case.
A valid returned function pointer (“fp”) **must** not be `NULL`.

The returned function pointer is of type [PFN_vkVoidFunction](PFN_vkVoidFunction.html), and **must**
be cast to the type of the command being queried before use.
The function pointer **must** only be called with a dispatchable object (the
first parameter) that is `device` or a child of `device`.

| `device` | `pName` | return value |
| --- | --- | --- |
| `NULL` | *1 | **undefined** |
| invalid device | *1 | **undefined** |
| device | `NULL` | **undefined** |
| device | requested core version2 device-level dispatchable command3 | fp4 |
| device | enabled extension device-level dispatchable command3 | fp4 |
| any other case, not covered above | `NULL` |

1

"*" means any representable value for the parameter (including valid
values, invalid values, and `NULL`).

2

Device-level commands which are part of the core version specified by
[VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` when creating the instance
will always return a valid function pointer.
If the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is enabled,
core commands beyond that version which are supported by the
implementation will return `NULL`, otherwise the implementation **may**
either return `NULL` or a function pointer.
If a function pointer is returned, it **must** not be called.

3

In this function, device-level excludes all physical-device-level
commands.

4

The returned function pointer **must** only be called with a dispatchable
object (the first parameter) that is `device` or a child of
`device` e.g. [VkDevice](VkDevice.html), [VkQueue](VkQueue.html), or
[VkCommandBuffer](VkCommandBuffer.html).

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceProcAddr-device-parameter) VUID-vkGetDeviceProcAddr-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceProcAddr-pName-parameter) VUID-vkGetDeviceProcAddr-pName-parameter

 `pName` **must** be a null-terminated UTF-8 string

[PFN_vkVoidFunction](PFN_vkVoidFunction.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#vkGetDeviceProcAddr).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
