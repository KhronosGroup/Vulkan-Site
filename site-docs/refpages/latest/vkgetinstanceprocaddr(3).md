# vkGetInstanceProcAddr(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetInstanceProcAddr.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetInstanceProcAddr - Return a function pointer for a command

Function pointers for all Vulkan commands **can** be obtained by calling:

// Provided by VK_VERSION_1_0
PFN_vkVoidFunction vkGetInstanceProcAddr(
    VkInstance                                  instance,
    const char*                                 pName);

* 
`instance` is the instance that the function pointer will be
compatible with, or `NULL` for commands not dependent on any instance.

* 
`pName` is the name of the command to obtain.

`vkGetInstanceProcAddr` itself is obtained in a platform- and loader-
specific manner.
Typically, the loader library will export this command as a function symbol,
so applications **can** link against the loader library, or load it dynamically
and look up the symbol using platform-specific APIs.

The table below defines the various use cases for
`vkGetInstanceProcAddr` and expected return value (“fp” is “function
pointer”) for each case.
A valid returned function pointer (“fp”) **must** not be `NULL`.

The returned function pointer is of type [PFN_vkVoidFunction](PFN_vkVoidFunction.html), and **must**
be cast to the type of the command being queried before use.

| `instance` | `pName` | return value |
| --- | --- | --- |
| *1 | `NULL` | **undefined** |
| invalid non-`NULL` instance | *1 | **undefined** |
| `NULL` | *global command*2 | fp |
| `NULL` | [vkGetInstanceProcAddr](#) | fp5 |
| instance | [vkGetInstanceProcAddr](#) | fp |
| instance | core *dispatchable command* | fp3 |
| instance | enabled instance extension dispatchable command for `instance` | fp3 |
| instance | available device extension4 dispatchable command for `instance` | fp3 |
| any other case, not covered above | `NULL` |

1

"*" means any representable value for the parameter (including valid
values, invalid values, and `NULL`).

2

    The global commands are:
[vkEnumerateInstanceVersion](vkEnumerateInstanceVersion.html),
    [vkEnumerateInstanceExtensionProperties](vkEnumerateInstanceExtensionProperties.html),
    [vkEnumerateInstanceLayerProperties](vkEnumerateInstanceLayerProperties.html), and [vkCreateInstance](vkCreateInstance.html).
    Dispatchable commands are all other commands which are not global.

3

The returned function pointer **must** only be called with a dispatchable
object (the first parameter) that is `instance` or a child of
`instance`, e.g. [VkInstance](VkInstance.html), [VkPhysicalDevice](VkPhysicalDevice.html),
[VkDevice](VkDevice.html), [VkQueue](VkQueue.html), or [VkCommandBuffer](VkCommandBuffer.html).

4

An “available device extension” is a device extension supported by any
physical device enumerated by `instance`.

5

Starting with Vulkan 1.2,
    `vkGetInstanceProcAddr` can resolve itself with a `NULL` instance
    pointer.

Valid Usage (Implicit)

* 
[](#VUID-vkGetInstanceProcAddr-instance-parameter) VUID-vkGetInstanceProcAddr-instance-parameter

 If `instance` is not `NULL`, `instance` **must** be a valid [VkInstance](VkInstance.html) handle

* 
[](#VUID-vkGetInstanceProcAddr-pName-parameter) VUID-vkGetInstanceProcAddr-pName-parameter

 `pName` **must** be a null-terminated UTF-8 string

[PFN_vkVoidFunction](PFN_vkVoidFunction.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkInstance](VkInstance.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#vkGetInstanceProcAddr).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
