# vkDestroyGpaSessionAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyGpaSessionAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyGpaSessionAMD - Destroy a GPA session object

To destroy a GPA session object, call:

// Provided by VK_AMD_gpa_interface
void vkDestroyGpaSessionAMD(
    VkDevice                                    device,
    VkGpaSessionAMD                             gpaSession,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the GPA session.

* 
`gpaSession` is the handle of the GPA session to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyGpaSessionAMD-gpaSession-12408) VUID-vkDestroyGpaSessionAMD-gpaSession-12408

All submitted commands that refer to `gpaSession` **must** have
completed execution

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyGpaSessionAMD-device-parameter) VUID-vkDestroyGpaSessionAMD-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyGpaSessionAMD-gpaSession-parameter) VUID-vkDestroyGpaSessionAMD-gpaSession-parameter

 If `gpaSession` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `gpaSession` **must** be a valid [VkGpaSessionAMD](VkGpaSessionAMD.html) handle

* 
[](#VUID-vkDestroyGpaSessionAMD-pAllocator-parameter) VUID-vkDestroyGpaSessionAMD-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyGpaSessionAMD-gpaSession-parent) VUID-vkDestroyGpaSessionAMD-gpaSession-parent

 If `gpaSession` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `gpaSession` **must** be externally synchronized

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkGpaSessionAMD](VkGpaSessionAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#vkDestroyGpaSessionAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
