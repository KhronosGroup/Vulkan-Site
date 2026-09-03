# VkPhysicalDeviceMaintenance10PropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance10PropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance10PropertiesKHR - Structure describing various implementation-defined properties introduced with VK_KHR_maintenance10

The `VkPhysicalDeviceMaintenance10PropertiesKHR` structure is defined
as:

// Provided by VK_KHR_maintenance10
typedef struct VkPhysicalDeviceMaintenance10PropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rgba4OpaqueBlackSwizzled;
    VkBool32           resolveSrgbFormatAppliesTransferFunction;
    VkBool32           resolveSrgbFormatSupportsTransferFunctionControl;
} VkPhysicalDeviceMaintenance10PropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `rgba4OpaqueBlackSwizzled`
indicates whether correct swizzling is applied to the opaque black
border color when using either the [VK_FORMAT_B4G4R4A4_UNORM_PACK16](VkFormat.html)
or [VK_FORMAT_R4G4B4A4_UNORM_PACK16](VkFormat.html) format.
If it is [VK_TRUE](VK_TRUE.html), the implementation will correctly produce an
opaque black border color with these formats.
If it is [VK_FALSE](VK_FALSE.html), the implementation **may** swap the first channel
with the alpha channel for the border color when sampling.

* 

`resolveSrgbFormatAppliesTransferFunction` indicates whether
resolving a multi-sampled sRGB format to single-sampled sRGB by a
weighted average converts the samples to linear before averaging.
This applies to both attachment resolves in a render pass and standalone
resolve commands.
If [VK_TRUE](VK_TRUE.html), implementation always converts to linear before
averaging unless overridden.
If [VK_FALSE](VK_FALSE.html), implementation never converts to linear before
averaging unless overridden.

* 

`resolveSrgbFormatSupportsTransferFunctionControl` indicates whether
the implementation supports overriding the default behavior in
`resolveSrgbFormatAppliesTransferFunction` in
render passes and [vkCmdResolveImage2](vkCmdResolveImage2.html).

Implementations supporting [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10)
**should** set `resolveSrgbFormatAppliesTransferFunction` to [VK_TRUE](VK_TRUE.html).

If the `VkPhysicalDeviceMaintenance10PropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance10PropertiesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance10PropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_10_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_maintenance10](VK_KHR_maintenance10.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceMaintenance10PropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
