# VkPhysicalDeviceDepthStencilResolveProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDepthStencilResolveProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDepthStencilResolveProperties - Structure describing depth/stencil resolve properties that can be supported by an implementation

The `VkPhysicalDeviceDepthStencilResolveProperties` structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceDepthStencilResolveProperties {
    VkStructureType       sType;
    void*                 pNext;
    VkResolveModeFlags    supportedDepthResolveModes;
    VkResolveModeFlags    supportedStencilResolveModes;
    VkBool32              independentResolveNone;
    VkBool32              independentResolve;
} VkPhysicalDeviceDepthStencilResolveProperties;

// Provided by VK_KHR_depth_stencil_resolve
// Equivalent to VkPhysicalDeviceDepthStencilResolveProperties
typedef VkPhysicalDeviceDepthStencilResolveProperties VkPhysicalDeviceDepthStencilResolvePropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`supportedDepthResolveModes` is a bitmask of
[VkResolveModeFlagBits](VkResolveModeFlagBits.html) indicating the set of supported depth
resolve modes.
[VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](VkResolveModeFlagBits.html) **must** be included in the set but
implementations **may** support additional modes.

* 

`supportedStencilResolveModes` is a bitmask of
[VkResolveModeFlagBits](VkResolveModeFlagBits.html) indicating the set of supported stencil
resolve modes.
[VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](VkResolveModeFlagBits.html) **must** be included in the set but
implementations **may** support additional modes.
[VK_RESOLVE_MODE_AVERAGE_BIT](VkResolveModeFlagBits.html) **must** not be included in the set.

* 

`independentResolveNone` is [VK_TRUE](VK_TRUE.html) if the implementation
supports setting the depth and stencil resolve modes to different values
when one of those modes is [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html).
Otherwise the implementation only supports setting both modes to the
same value.

* 
 `independentResolve`
is [VK_TRUE](VK_TRUE.html) if the implementation supports all combinations of the
supported depth and stencil resolve modes, including setting either
depth or stencil resolve mode to [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html).
An implementation that supports `independentResolve` **must** also
support `independentResolveNone`.

If the `VkPhysicalDeviceDepthStencilResolveProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDepthStencilResolveProperties-sType-sType) VUID-VkPhysicalDeviceDepthStencilResolveProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_STENCIL_RESOLVE_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_depth_stencil_resolve](VK_KHR_depth_stencil_resolve.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), `VkBool32`, [VkResolveModeFlags](VkResolveModeFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceDepthStencilResolveProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
