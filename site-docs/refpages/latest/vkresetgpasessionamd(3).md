# vkResetGpaSessionAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkResetGpaSessionAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkResetGpaSessionAMD - Reset a GPA session

To reset a GPA session for reuse, call:

// Provided by VK_AMD_gpa_interface
VkResult vkResetGpaSessionAMD(
    VkDevice                                    device,
    VkGpaSessionAMD                             gpaSession);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`gpaSession` is the handle of the GPA session to reset.

Valid Usage (Implicit)

* 
[](#VUID-vkResetGpaSessionAMD-device-parameter) VUID-vkResetGpaSessionAMD-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkResetGpaSessionAMD-gpaSession-parameter) VUID-vkResetGpaSessionAMD-gpaSession-parameter

 `gpaSession` **must** be a valid [VkGpaSessionAMD](VkGpaSessionAMD.html) handle

* 
[](#VUID-vkResetGpaSessionAMD-gpaSession-parent) VUID-vkResetGpaSessionAMD-gpaSession-parent

 `gpaSession` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkDevice](VkDevice.html), [VkGpaSessionAMD](VkGpaSessionAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/gpa_interface.html#vkResetGpaSessionAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
