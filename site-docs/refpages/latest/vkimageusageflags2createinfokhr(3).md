# VkImageUsageFlags2CreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageUsageFlags2CreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageUsageFlags2CreateInfoKHR - Extended image usage flags

The `VkImageUsageFlags2CreateInfoKHR` structure is defined as:

// Provided by VK_KHR_extended_flags
typedef struct VkImageUsageFlags2CreateInfoKHR {
    VkStructureType          sType;
    void*                    pNext;
    VkImageUsageFlags2KHR    usage;
} VkImageUsageFlags2CreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`usage` is a bitmask of [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html) specifying
allowed usages of the image.

If this structure is included in the `pNext` chain of an image creation
structure, `usage` is used instead of the corresponding `usage`
value passed in that creation structure, allowing additional usage flags to
be specified.

If this structure is included in the `pNext` chain of a query structure
including [VkImageCreateFlags](VkImageCreateFlags.html), the usage flags of the image are
returned in `flags` of this structure, allowing additional usage flags
to be queried.
The flags representable in [VkImageUsageFlags](VkImageUsageFlags.html) are still returned in the
query structure in this case.

Valid Usage (Implicit)

* 
[](#VUID-VkImageUsageFlags2CreateInfoKHR-sType-sType) VUID-VkImageUsageFlags2CreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_USAGE_FLAGS_2_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkImageUsageFlags2CreateInfoKHR-usage-parameter) VUID-VkImageUsageFlags2CreateInfoKHR-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html) values

* 
[](#VUID-VkImageUsageFlags2CreateInfoKHR-usage-requiredbitmask) VUID-VkImageUsageFlags2CreateInfoKHR-usage-requiredbitmask

 `usage` **must** not be `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFramebufferAttachmentImageInfo](VkFramebufferAttachmentImageInfo.html)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

* 
[VkPhysicalDeviceSparseImageFormatInfo2](VkPhysicalDeviceSparseImageFormatInfo2.html)

* 
[VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

* 
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)

* 
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)

[VK_KHR_extended_flags](VK_KHR_extended_flags.html), [VkImageUsageFlags2KHR](VkImageUsageFlags2KHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageUsageFlags2CreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
