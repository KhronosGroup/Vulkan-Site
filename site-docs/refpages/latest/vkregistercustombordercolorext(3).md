# vkRegisterCustomBorderColorEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkRegisterCustomBorderColorEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkRegisterCustomBorderColorEXT - Register a custom border color

To register a custom border color, call:

// Provided by VK_EXT_custom_border_color with VK_EXT_descriptor_heap
VkResult vkRegisterCustomBorderColorEXT(
    VkDevice                                    device,
    const VkSamplerCustomBorderColorCreateInfoEXT* pBorderColor,
    VkBool32                                    requestIndex,
    uint32_t*                                   pIndex);

* 
`device` is the logical device where the border color is registered.

* 
`pBorderColor` is a pointer to a
[VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html) structure specifying the
custom border color value to register.

* 
`requestIndex` is a Boolean value indicating if a specific index is
requested or not.

* 
`pIndex` is a pointer to a `uint32_t` index value that will be
written by the command upon success.

If `requestIndex` is [VK_TRUE](VK_TRUE.html), the value present in `pIndex`
when passed to the command is a requested index, and rather than returning a
new index, the implementation will attempt to register that index, leaving
the value intact.
If the implementation is unable to register a requested index,
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](VkResult.html) will be returned.
If an index has not been registered (either explicitly or implicitly by
creating a sampler object), or if it has been subsequently unregistered, the
implementation **must** register that index successfully.

If `requestIndex` is [VK_FALSE](VK_FALSE.html), the value stored in `pIndex` is
ignored, and a new index will be returned if the implementation is able to
register a new index.
If the implementation is unable to register a new index,
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html) will be returned.

If an index is successfully registered, it **can** be used when writing a
sampler descriptor or creating a sampler object to use with the custom
border color, via [VkSamplerCustomBorderColorIndexCreateInfoEXT](VkSamplerCustomBorderColorIndexCreateInfoEXT.html).

|  | The type of border color is not specified by this command
| --- | --- |
([VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html) vs.
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html)); the data will be interpreted at the
point the border color is sampled with an actual sampler.
Implementations are expected to store the data as raw bytes if they do not
need the format to be specified. |

Valid Usage

* 
[](#VUID-vkRegisterCustomBorderColorEXT-requestIndex-11287) VUID-vkRegisterCustomBorderColorEXT-requestIndex-11287

If `requestIndex` is [VK_TRUE](VK_TRUE.html), the value stored in `pIndex`
**must** be less than [    maxCustomBorderColorSamplers](../../../../spec/latest/chapters/limits.html#limits-maxCustomBorderColorSamplers)

Valid Usage (Implicit)

* 
[](#VUID-vkRegisterCustomBorderColorEXT-device-parameter) VUID-vkRegisterCustomBorderColorEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkRegisterCustomBorderColorEXT-pBorderColor-parameter) VUID-vkRegisterCustomBorderColorEXT-pBorderColor-parameter

 `pBorderColor` **must** be a valid pointer to a valid [VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html) structure

* 
[](#VUID-vkRegisterCustomBorderColorEXT-pIndex-parameter) VUID-vkRegisterCustomBorderColorEXT-pIndex-parameter

 `pIndex` **must** be a valid pointer to a `uint32_t` value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_custom_border_color](VK_EXT_custom_border_color.html), [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), `VkBool32`, [VkDevice](VkDevice.html), [VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#vkRegisterCustomBorderColorEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
