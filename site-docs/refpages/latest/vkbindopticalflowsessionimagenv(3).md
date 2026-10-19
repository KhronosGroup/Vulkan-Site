# vkBindOpticalFlowSessionImageNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkBindOpticalFlowSessionImageNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkBindOpticalFlowSessionImageNV - Bind image to an optical flow session

To bind a Vulkan image to an optical flow session object, call:

// Provided by VK_NV_optical_flow
VkResult vkBindOpticalFlowSessionImageNV(
    VkDevice                                    device,
    VkOpticalFlowSessionNV                      session,
    VkOpticalFlowSessionBindingPointNV          bindingPoint,
    VkImageView                                 view,
    VkImageLayout                               layout);

* 
`device` is the device which owns the optical flow session object
`session`.

* 
`session` is the optical flow session object to which the image view
is to be bound.

* 
`bindingPoint` specifies the binding point
[VkOpticalFlowSessionBindingPointNV](VkOpticalFlowSessionBindingPointNV.html) to which the image view is
bound.

* 
`view` is a [VkImageView](VkImageView.html) to be bound.

* 
`layout` **must** specify the layout that the image subresources
accessible from `view` will be in at the time the optical flow
vectors are calculated with [vkCmdOpticalFlowExecuteNV](vkCmdOpticalFlowExecuteNV.html) on a
`VkDevice`.

Valid Usage (Implicit)

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-device-parameter) VUID-vkBindOpticalFlowSessionImageNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-session-parameter) VUID-vkBindOpticalFlowSessionImageNV-session-parameter

 `session` **must** be a valid [VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html) handle

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-bindingPoint-parameter) VUID-vkBindOpticalFlowSessionImageNV-bindingPoint-parameter

 `bindingPoint` **must** be a valid [VkOpticalFlowSessionBindingPointNV](VkOpticalFlowSessionBindingPointNV.html) value

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-view-parameter) VUID-vkBindOpticalFlowSessionImageNV-view-parameter

 If `view` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `view` **must** be a valid [VkImageView](VkImageView.html) handle

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-layout-parameter) VUID-vkBindOpticalFlowSessionImageNV-layout-parameter

 `layout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-session-parent) VUID-vkBindOpticalFlowSessionImageNV-session-parent

 `session` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-view-parent) VUID-vkBindOpticalFlowSessionImageNV-view-parent

 If `view` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_optical_flow](VK_NV_optical_flow.html), [VkDevice](VkDevice.html), [VkImageLayout](VkImageLayout.html), [VkImageView](VkImageView.html), [VkOpticalFlowSessionBindingPointNV](VkOpticalFlowSessionBindingPointNV.html), [VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#vkBindOpticalFlowSessionImageNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
