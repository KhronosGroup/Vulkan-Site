# VkFenceCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFenceCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFenceCreateFlagBits - Bitmask specifying initial state and behavior of a fence

// Provided by VK_VERSION_1_0
typedef enum VkFenceCreateFlagBits {
    VK_FENCE_CREATE_SIGNALED_BIT = 0x00000001,
} VkFenceCreateFlagBits;

* 
[VK_FENCE_CREATE_SIGNALED_BIT](#) specifies that the fence object is
created in the signaled state.
Otherwise, it is created in the unsignaled state.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkFenceCreateFlags](VkFenceCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkFenceCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
