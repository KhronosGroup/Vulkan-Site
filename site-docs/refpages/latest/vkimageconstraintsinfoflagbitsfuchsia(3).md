# VkImageConstraintsInfoFlagBitsFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageConstraintsInfoFlagBitsFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageConstraintsInfoFlagBitsFUCHSIA - Bitmask specifying image constraints flags

Bits which **can** be set in
[VkImageConstraintsInfoFlagBitsFUCHSIA](#)::`flags` include:

// Provided by VK_FUCHSIA_buffer_collection
typedef enum VkImageConstraintsInfoFlagBitsFUCHSIA {
    VK_IMAGE_CONSTRAINTS_INFO_CPU_READ_RARELY_FUCHSIA = 0x00000001,
    VK_IMAGE_CONSTRAINTS_INFO_CPU_READ_OFTEN_FUCHSIA = 0x00000002,
    VK_IMAGE_CONSTRAINTS_INFO_CPU_WRITE_RARELY_FUCHSIA = 0x00000004,
    VK_IMAGE_CONSTRAINTS_INFO_CPU_WRITE_OFTEN_FUCHSIA = 0x00000008,
    VK_IMAGE_CONSTRAINTS_INFO_PROTECTED_OPTIONAL_FUCHSIA = 0x00000010,
} VkImageConstraintsInfoFlagBitsFUCHSIA;

General hints about the type of memory that should be allocated by Sysmem
based on the expected usage of the images in the buffer collection include:

* 
[VK_IMAGE_CONSTRAINTS_INFO_CPU_READ_RARELY_FUCHSIA](#)

* 
[VK_IMAGE_CONSTRAINTS_INFO_CPU_READ_OFTEN_FUCHSIA](#)

* 
[VK_IMAGE_CONSTRAINTS_INFO_CPU_WRITE_RARELY_FUCHSIA](#)

* 
[VK_IMAGE_CONSTRAINTS_INFO_CPU_WRITE_OFTEN_FUCHSIA](#)

For protected memory:

* 
[VK_IMAGE_CONSTRAINTS_INFO_PROTECTED_OPTIONAL_FUCHSIA](#) specifies
that protected memory is optional for the buffer collection.

Note that if all participants in the buffer collection (Vulkan or otherwise)
specify that protected memory is optional, Sysmem will not allocate
protected memory.

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkImageConstraintsInfoFlagsFUCHSIA](VkImageConstraintsInfoFlagsFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageConstraintsInfoFlagBitsFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
