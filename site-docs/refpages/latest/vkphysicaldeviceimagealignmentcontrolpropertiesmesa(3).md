# VkPhysicalDeviceImageAlignmentControlPropertiesMESA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceImageAlignmentControlPropertiesMESA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceImageAlignmentControlPropertiesMESA - Structure describing supported image alignments for a physical device

The `VkPhysicalDeviceImageAlignmentControlPropertiesMESA` structure is
defined as:

// Provided by VK_MESA_image_alignment_control
typedef struct VkPhysicalDeviceImageAlignmentControlPropertiesMESA {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           supportedImageAlignmentMask;
} VkPhysicalDeviceImageAlignmentControlPropertiesMESA;

The members of the `VkPhysicalDeviceImageAlignmentControlPropertiesMESA`
structure describe the following:

* 
 `supportedImageAlignmentMask`
is a bitwise-or of all potentially supported image alignments for a
given physical device when using [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html).
If a given alignment is supported, the application **can** request an image
to have that alignment.
A given set of image creation parameters **may** support a subset of these
alignments.
To determine if a particular alignment is supported for a given set of
image creation parameters, check
[VkMemoryRequirements](VkMemoryRequirements.html)::`alignment` after chaining in
[VkImageAlignmentControlCreateInfoMESA](VkImageAlignmentControlCreateInfoMESA.html).

If the `VkPhysicalDeviceImageAlignmentControlPropertiesMESA` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageAlignmentControlPropertiesMESA-sType-sType) VUID-VkPhysicalDeviceImageAlignmentControlPropertiesMESA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ALIGNMENT_CONTROL_PROPERTIES_MESA](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_MESA_image_alignment_control](VK_MESA_image_alignment_control.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceImageAlignmentControlPropertiesMESA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
