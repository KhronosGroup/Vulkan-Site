# VkImageCreateFlags2CreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageCreateFlags2CreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageCreateFlags2CreateInfoKHR - Extended image usage flags

The `VkImageCreateFlags2CreateInfoKHR` structure is defined as:

// Provided by VK_KHR_extended_flags
typedef struct VkImageCreateFlags2CreateInfoKHR {
    VkStructureType           sType;
    void*                     pNext;
    VkImageCreateFlags2KHR    flags;
} VkImageCreateFlags2CreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html) specifying
creation flags of the image.

If this structure is included in the `pNext` chain of an image creation
structure, `flags` is used instead of the corresponding `flags`
value passed in that creation structure, allowing additional create flags to
be specified.

If this structure is included in the `pNext` chain of a query structure
including [VkImageCreateFlags](VkImageCreateFlags.html), the create flags of the image are
returned in `flags` of this structure, allowing additional create flags
to be queried.
The flags representable in [VkImageCreateFlags](VkImageCreateFlags.html) are still returned in
the query structure in this case.

Valid Usage (Implicit)

* 
[](#VUID-VkImageCreateFlags2CreateInfoKHR-sType-sType) VUID-VkImageCreateFlags2CreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_CREATE_FLAGS_2_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkImageCreateFlags2CreateInfoKHR-flags-parameter) VUID-VkImageCreateFlags2CreateInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html) values

* 
[](#VUID-VkImageCreateFlags2CreateInfoKHR-flags-requiredbitmask) VUID-VkImageCreateFlags2CreateInfoKHR-flags-requiredbitmask

 `flags` **must** not be `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFramebufferAttachmentImageInfo](VkFramebufferAttachmentImageInfo.html)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

* 
[VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)

[VK_KHR_extended_flags](VK_KHR_extended_flags.html), [VkImageCreateFlags2KHR](VkImageCreateFlags2KHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageCreateFlags2CreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
