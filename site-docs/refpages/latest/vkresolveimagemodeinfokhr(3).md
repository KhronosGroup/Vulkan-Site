# VkResolveImageModeInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkResolveImageModeInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkResolveImageModeInfoKHR - Structure specifying additional control for VkResolveImageInfo2

The `VkResolveImageModeInfoKHR` structure is defined as:

// Provided by VK_KHR_maintenance10
typedef struct VkResolveImageModeInfoKHR {
    VkStructureType           sType;
    const void*               pNext;
    VkResolveImageFlagsKHR    flags;
    VkResolveModeFlagBits     resolveMode;
    VkResolveModeFlagBits     stencilResolveMode;
} VkResolveImageModeInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkResolveImageFlagBitsKHR](VkResolveImageFlagBitsKHR.html).

* 
`resolveMode` is a [VkResolveModeFlagBits](VkResolveModeFlagBits.html) value defining how
`srcImage` will be resolved into `dstImage` when resolving
non-stencil values.

* 
`stencilResolveMode` is a [VkResolveModeFlagBits](VkResolveModeFlagBits.html) value defining
how `srcImage` will be resolved into `dstImage` when resolving
stencil values.

Valid Usage

* 
[](#VUID-VkResolveImageModeInfoKHR-flags-10995) VUID-VkResolveImageModeInfoKHR-flags-10995

If `flags` includes
[VK_RESOLVE_IMAGE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html), `flags` **must**
not include [VK_RESOLVE_IMAGE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html)

* 
[](#VUID-VkResolveImageModeInfoKHR-flags-10996) VUID-VkResolveImageModeInfoKHR-flags-10996

If `flags` includes
[VK_RESOLVE_IMAGE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html) or
[VK_RESOLVE_IMAGE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html),
[`resolveSrgbFormatSupportsTransferFunctionControl`](../../../../spec/latest/chapters/limits.html#limits-resolveSrgbFormatSupportsTransferFunctionControl)
**must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkResolveImageModeInfoKHR-flags-10997) VUID-VkResolveImageModeInfoKHR-flags-10997

If `flags` includes
[VK_RESOLVE_IMAGE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html) or
[VK_RESOLVE_IMAGE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html),
`resolveMode` **must** be equal to [VK_RESOLVE_MODE_AVERAGE_BIT](VkResolveModeFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkResolveImageModeInfoKHR-sType-sType) VUID-VkResolveImageModeInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RESOLVE_IMAGE_MODE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkResolveImageModeInfoKHR-flags-parameter) VUID-VkResolveImageModeInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkResolveImageFlagBitsKHR](VkResolveImageFlagBitsKHR.html) values

* 
[](#VUID-VkResolveImageModeInfoKHR-resolveMode-parameter) VUID-VkResolveImageModeInfoKHR-resolveMode-parameter

 If `resolveMode` is not `0`, `resolveMode` **must** be a valid [VkResolveModeFlagBits](VkResolveModeFlagBits.html) value

* 
[](#VUID-VkResolveImageModeInfoKHR-stencilResolveMode-parameter) VUID-VkResolveImageModeInfoKHR-stencilResolveMode-parameter

 If `stencilResolveMode` is not `0`, `stencilResolveMode` **must** be a valid [VkResolveModeFlagBits](VkResolveModeFlagBits.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkResolveImageInfo2](VkResolveImageInfo2.html)

[VK_KHR_maintenance10](VK_KHR_maintenance10.html), [VkResolveImageFlagsKHR](VkResolveImageFlagsKHR.html), [VkResolveModeFlagBits](VkResolveModeFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkResolveImageModeInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
