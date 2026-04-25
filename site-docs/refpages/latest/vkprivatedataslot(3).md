# VkPrivateDataSlot(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPrivateDataSlot.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPrivateDataSlot - Opaque handle to a private data slot object

Private data slots are represented by `VkPrivateDataSlot` handles:

// Provided by VK_VERSION_1_3
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPrivateDataSlot)

// Provided by VK_EXT_private_data
// Equivalent to VkPrivateDataSlot
typedef VkPrivateDataSlot VkPrivateDataSlotEXT;

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_EXT_private_data](VK_EXT_private_data.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [vkCreatePrivateDataSlot](vkCreatePrivateDataSlot.html), [vkCreatePrivateDataSlot](vkCreatePrivateDataSlot.html), [vkDestroyPrivateDataSlot](vkDestroyPrivateDataSlot.html), [vkDestroyPrivateDataSlot](vkDestroyPrivateDataSlot.html), [vkGetPrivateData](vkGetPrivateData.html), [vkGetPrivateData](vkGetPrivateData.html), [vkSetPrivateData](vkSetPrivateData.html), [vkSetPrivateData](vkSetPrivateData.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/private_data.html#VkPrivateDataSlot).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
