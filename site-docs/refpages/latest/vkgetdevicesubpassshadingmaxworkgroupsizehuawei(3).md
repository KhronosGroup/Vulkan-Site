# vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI - Query maximum supported subpass shading workgroup size for a give render pass

A subpass shading pipeline’s workgroup size is a 2D vector with number of
power-of-two in width and height.
The maximum number of width and height is implementation-dependent, and **may**
vary for different formats and sample counts of attachments in a render
pass.

To query the maximum workgroup size, call:

// Provided by VK_HUAWEI_subpass_shading
VkResult vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI(
    VkDevice                                    device,
    VkRenderPass                                renderpass,
    VkExtent2D*                                 pMaxWorkgroupSize);

* 
`device` is a handle to a local device object that was used to
create the given render pass.

* 
`renderpass` is a handle to a render pass object describing the
environment in which the pipeline will be used.
The pipeline **must** only be used with a render pass instance compatible
with the one provided.
See [Render Pass Compatibility](../../../../spec/latest/chapters/renderpass.html#renderpass-compatibility) for more
information.

* 
`pMaxWorkgroupSize` is a pointer to a [VkExtent2D](VkExtent2D.html) structure.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-device-parameter) VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-renderpass-parameter) VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-renderpass-parameter

 `renderpass` **must** be a valid [VkRenderPass](VkRenderPass.html) handle

* 
[](#VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-pMaxWorkgroupSize-parameter) VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-pMaxWorkgroupSize-parameter

 `pMaxWorkgroupSize` **must** be a valid pointer to [VkExtent2D](VkExtent2D.html) structures

* 
[](#VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-renderpass-parent) VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-renderpass-parent

 `renderpass` **must** have been created, allocated, or retrieved from `device`

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
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_HUAWEI_subpass_shading](VK_HUAWEI_subpass_shading.html), [VkDevice](VkDevice.html), [VkExtent2D](VkExtent2D.html), [VkRenderPass](VkRenderPass.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
