# VkMemoryDedicatedRequirements(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryDedicatedRequirements.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryDedicatedRequirements - Structure describing dedicated allocation requirements of buffer and image resources

The `VkMemoryDedicatedRequirements` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkMemoryDedicatedRequirements {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           prefersDedicatedAllocation;
    VkBool32           requiresDedicatedAllocation;
} VkMemoryDedicatedRequirements;

// Provided by VK_KHR_dedicated_allocation
// Equivalent to VkMemoryDedicatedRequirements
typedef VkMemoryDedicatedRequirements VkMemoryDedicatedRequirementsKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`prefersDedicatedAllocation` specifies that the implementation would
prefer a dedicated allocation for this resource.
The application is still free to suballocate the resource but it **may**
get better performance if a dedicated allocation is used.

* 
`requiresDedicatedAllocation` specifies that a dedicated allocation
is required for this resource.

To determine the dedicated allocation requirements of a buffer or image
or tensor
resource, add a [VkMemoryDedicatedRequirements](#) structure to the
`pNext` chain of the [VkMemoryRequirements2](VkMemoryRequirements2.html) structure passed as the
`pMemoryRequirements` parameter of [vkGetBufferMemoryRequirements2](vkGetBufferMemoryRequirements2.html),
[vkGetTensorMemoryRequirementsARM](vkGetTensorMemoryRequirementsARM.html),
[vkGetDeviceBufferMemoryRequirements](vkGetDeviceBufferMemoryRequirements.html),
[vkGetDeviceImageMemoryRequirements](vkGetDeviceImageMemoryRequirements.html),
or [vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html) respectively.

Constraints on the values returned for buffer resources are:

* 
`requiresDedicatedAllocation` **may** be [VK_TRUE](VK_TRUE.html) if the
`pNext` chain of [VkBufferCreateInfo](VkBufferCreateInfo.html) for the call to
`vkCreateBuffer` used to create the buffer being queried included a
[VkExternalMemoryBufferCreateInfo](VkExternalMemoryBufferCreateInfo.html) structure, and any of the handle
types specified in
[VkExternalMemoryBufferCreateInfo](VkExternalMemoryBufferCreateInfo.html)::`handleTypes` requires
dedicated allocation, as reported by
[vkGetPhysicalDeviceExternalBufferProperties](vkGetPhysicalDeviceExternalBufferProperties.html) in
`VkExternalBufferProperties`::`externalMemoryProperties.externalMemoryFeatures`.
Otherwise, `requiresDedicatedAllocation` will be [VK_FALSE](VK_FALSE.html).

* 
When the implementation sets `requiresDedicatedAllocation` to
[VK_TRUE](VK_TRUE.html), it **must** also set `prefersDedicatedAllocation` to
[VK_TRUE](VK_TRUE.html).

* 
If [VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html) was set in
[VkBufferCreateInfo](VkBufferCreateInfo.html)::`flags` when `buffer` was created,
then both `prefersDedicatedAllocation` and
`requiresDedicatedAllocation` will be [VK_FALSE](VK_FALSE.html).

Constraints on the values returned for image resources are:

* 
`requiresDedicatedAllocation` **may** be [VK_TRUE](VK_TRUE.html) if the
`pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html) for the call to
[vkCreateImage](vkCreateImage.html) used to create the image being queried included a
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html) structure, and any of the handle
types specified in
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes` requires
dedicated allocation, as reported by
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) in
`VkExternalImageFormatProperties`::`externalMemoryProperties.externalMemoryFeatures`.

* 
`requiresDedicatedAllocation` **may** be [VK_TRUE](VK_TRUE.html) if the image’s
tiling is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html).

* 
`requiresDedicatedAllocation` will
otherwise
be [VK_FALSE](VK_FALSE.html)

* 
If [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html) was set in
[VkImageCreateInfo](VkImageCreateInfo.html)::`flags` when `image` was created, then
both `prefersDedicatedAllocation` and
`requiresDedicatedAllocation` will be [VK_FALSE](VK_FALSE.html).

Constraints on the values returned for tensor resources are:

* 
`requiresDedicatedAllocation` **may** be [VK_TRUE](VK_TRUE.html) if the
`pNext` chain of [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html) for the call to
`vkCreateTensorARM` used to create the tensor being queried included
a [VkExternalMemoryTensorCreateInfoARM](VkExternalMemoryTensorCreateInfoARM.html) structure, and any of the
handle types specified in
[VkExternalMemoryTensorCreateInfoARM](VkExternalMemoryTensorCreateInfoARM.html)::`handleTypes` requires
dedicated allocation, as reported by
[vkGetPhysicalDeviceExternalTensorPropertiesARM](vkGetPhysicalDeviceExternalTensorPropertiesARM.html) in
`VkExternalTensorPropertiesARM`::`externalMemoryProperties.externalMemoryFeatures`.

* 
`requiresDedicatedAllocation` will otherwise be [VK_FALSE](VK_FALSE.html).

* 
When the implementation sets `requiresDedicatedAllocation` to
[VK_TRUE](VK_TRUE.html), it **must** also set `prefersDedicatedAllocation` to
[VK_TRUE](VK_TRUE.html).

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryDedicatedRequirements-sType-sType) VUID-VkMemoryDedicatedRequirements-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_DEDICATED_REQUIREMENTS](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryRequirements2](VkMemoryRequirements2.html)

[VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkMemoryDedicatedRequirements).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
