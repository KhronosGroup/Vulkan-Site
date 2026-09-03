# VkQueueFamilyOptimalImageTransferGranularityPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyOptimalImageTransferGranularityPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyOptimalImageTransferGranularityPropertiesKHR - Structure specifying the optimal image transfer granularity for a queue family

The [VkQueueFamilyOptimalImageTransferGranularityPropertiesKHR](#)
structure is defined as:

// Provided by VK_KHR_maintenance11
typedef struct VkQueueFamilyOptimalImageTransferGranularityPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkExtent3D         optimalImageTransferGranularity;
} VkQueueFamilyOptimalImageTransferGranularityPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`optimalImageTransferGranularity` is the optimal granularity for
image copy operations in this queue family.

If this structure is included in the `pNext` chain of the
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html) structure passed to
[vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html), then it is filled with the
optimal image transfer granularity for the specified queue family.

The value returned in `optimalImageTransferGranularity` has a unit of
compressed texel blocks for images having a block-compressed format, and a
unit of texels otherwise.

Possible values of `optimalImageTransferGranularity` are:

* 
(0,0,0) specifies that an image copy operation is optimal only
when copying whole mip levels, i.e. all of the following conditions are
met:

The `x`, `y`, and `z` members of a [VkOffset3D](VkOffset3D.html) are
zero.

* 
The `width`, `height`, and `depth` members of a
[VkExtent3D](VkExtent3D.html) parameter match the width, height, and depth of the
image subresource corresponding to the parameter, respectively.

(Ax, Ay, Az) where Ax, Ay, and Az
are all integer powers of two.
An image copy operation is optimal when all of the following conditions
are met:

* 
`width` of a [VkExtent3D](VkExtent3D.html) parameter is an integer multiple of
Ax, or else `x` +  `width` equals the width
of the image subresource corresponding to the parameter.

* 
`height` of a [VkExtent3D](VkExtent3D.html) parameter is an integer multiple of
Ay, or else `y` +  `height` equals the height
of the image subresource corresponding to the parameter.

* 
`depth` of a [VkExtent3D](VkExtent3D.html) parameter is an integer multiple of
Az, or else `z` +  `depth` equals the depth
of the image subresource corresponding to the parameter.

* 
If the format of the image corresponding to the parameters is one of
the block-compressed formats then for the purposes of the above
calculations the granularity **must** be scaled up by the compressed texel
block dimensions.

|  | While it is not required that copies are optimal, there may be a performance
| --- | --- |
cost for copies not aligned to `optimalImageTransferGranularity`. |

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyOptimalImageTransferGranularityPropertiesKHR-sType-sType) VUID-VkQueueFamilyOptimalImageTransferGranularityPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_OPTIMAL_IMAGE_TRANSFER_GRANULARITY_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html)

[VK_KHR_maintenance11](VK_KHR_maintenance11.html), [VkExtent3D](VkExtent3D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFamilyOptimalImageTransferGranularityPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
