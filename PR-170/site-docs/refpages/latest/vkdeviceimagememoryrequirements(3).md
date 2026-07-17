# VkDeviceImageMemoryRequirements(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceImageMemoryRequirements.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceImageMemoryRequirements - (None)

The `VkDeviceImageMemoryRequirements` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkDeviceImageMemoryRequirements {
    VkStructureType             sType;
    const void*                 pNext;
    const VkImageCreateInfo*    pCreateInfo;
    VkImageAspectFlagBits       planeAspect;
} VkDeviceImageMemoryRequirements;

// Provided by VK_KHR_maintenance4
// Equivalent to VkDeviceImageMemoryRequirements
typedef VkDeviceImageMemoryRequirements VkDeviceImageMemoryRequirementsKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pCreateInfo` is a pointer to a [VkImageCreateInfo](VkImageCreateInfo.html) structure
containing parameters affecting creation of the image to query.

* 
`planeAspect` is a [VkImageAspectFlagBits](VkImageAspectFlagBits.html) value specifying the
aspect corresponding to the image plane to query.
This parameter is ignored unless
`pCreateInfo->tiling` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), or
`pCreateInfo->flags` has [VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) set.

Valid Usage

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06416) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06416

The `pCreateInfo->pNext` chain **must** not contain a
[VkImageSwapchainCreateInfoKHR](VkImageSwapchainCreateInfoKHR.html) structure

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06776) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06776

The `pCreateInfo->pNext` chain **must** not contain a
[VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html) structure

* 
[](#VUID-VkDeviceImageMemoryRequirements-pNext-06996) VUID-VkDeviceImageMemoryRequirements-pNext-06996

Applications also **must** not call
[vkGetDeviceImageMemoryRequirements](vkGetDeviceImageMemoryRequirements.html) with a [VkImageCreateInfo](VkImageCreateInfo.html)
whose `pNext` chain includes a [VkExternalFormatANDROID](VkExternalFormatANDROID.html)
structure with non-zero `externalFormat`

* 
[](#VUID-VkDeviceImageMemoryRequirements-pNext-08962) VUID-VkDeviceImageMemoryRequirements-pNext-08962

Applications also **must** not call
[vkGetDeviceImageMemoryRequirements](vkGetDeviceImageMemoryRequirements.html) with a [VkImageCreateInfo](VkImageCreateInfo.html)
whose `pNext` chain includes a [VkExternalFormatQNX](VkExternalFormatQNX.html) structure
with non-zero `externalFormat`

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06417) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06417

If `pCreateInfo->format` specifies a *multi-planar* format and
`pCreateInfo->flags` has [VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) set then
`planeAspect` **must** not be [VK_IMAGE_ASPECT_NONE_KHR](VkImageAspectFlagBits.html)

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06419) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06419

If `pCreateInfo->flags` has [VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html) set
and if the `pCreateInfo->tiling` is [VK_IMAGE_TILING_LINEAR](VkImageTiling.html) or
[VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), then `planeAspect` **must** be a single
valid [multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06420) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06420

If `pCreateInfo->tiling` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html), then `planeAspect`
**must** be a single valid *memory plane* for the image (that is,
`aspectMask` **must** specify a plane index that is less than the
[VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html)::`drmFormatModifierPlaneCount`
associated with the image’s `format` and
[VkImageDrmFormatModifierPropertiesEXT](VkImageDrmFormatModifierPropertiesEXT.html)::`drmFormatModifier`)

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceImageMemoryRequirements-sType-sType) VUID-VkDeviceImageMemoryRequirements-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_IMAGE_MEMORY_REQUIREMENTS](VkStructureType.html)

* 
[](#VUID-VkDeviceImageMemoryRequirements-pNext-pNext) VUID-VkDeviceImageMemoryRequirements-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-parameter) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkImageCreateInfo](VkImageCreateInfo.html) structure

* 
[](#VUID-VkDeviceImageMemoryRequirements-planeAspect-parameter) VUID-VkDeviceImageMemoryRequirements-planeAspect-parameter

 If `planeAspect` is not `0`, `planeAspect` **must** be a valid [VkImageAspectFlagBits](VkImageAspectFlagBits.html) value

[VK_KHR_maintenance4](VK_KHR_maintenance4.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkImageAspectFlagBits](VkImageAspectFlagBits.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkStructureType](VkStructureType.html), [vkGetDeviceImageMemoryRequirements](vkGetDeviceImageMemoryRequirements.html), [vkGetDeviceImageMemoryRequirements](vkGetDeviceImageMemoryRequirements.html), [vkGetDeviceImageSparseMemoryRequirements](vkGetDeviceImageSparseMemoryRequirements.html), [vkGetDeviceImageSparseMemoryRequirements](vkGetDeviceImageSparseMemoryRequirements.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkDeviceImageMemoryRequirements).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
