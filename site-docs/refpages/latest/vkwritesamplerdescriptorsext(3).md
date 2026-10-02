# vkWriteSamplerDescriptorsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkWriteSamplerDescriptorsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkWriteSamplerDescriptorsEXT - Write sampler descriptors to memory

To write sampler descriptors to memory, call:

// Provided by VK_EXT_descriptor_heap
VkResult vkWriteSamplerDescriptorsEXT(
    VkDevice                                    device,
    uint32_t                                    samplerCount,
    const VkSamplerCreateInfo*                  pSamplers,
    const VkHostAddressRangeEXT*                pDescriptors);

* 
`device` is the logical device that the descriptors are for.

* 
`samplerCount` is the number of elements in `pSamplers` and
`pDescriptors`.

* 
`pSamplers` is a pointer to an array of [VkSamplerCreateInfo](VkSamplerCreateInfo.html)
structures defining properties of the sampler descriptors that will be
written.

* 
`pDescriptors` is a pointer to an array of
[VkHostAddressRangeEXT](VkHostAddressRangeEXT.html) structures defining the host address ranges
that will be written to for each descriptor.

Each descriptor will be written to `pDescriptors`[i].`address` where
i is the index of its create info in `pSamplers`.

Descriptors written using a fully identical [VkSamplerCreateInfo](VkSamplerCreateInfo.html)
structure on the same [VkDevice](VkDevice.html) will always return the same bit
pattern.
If the [descriptorHeapCaptureReplay](../../../../spec/latest/chapters/features.html#features-descriptorHeapCaptureReplay)
feature is enabled, descriptors written using a fully identical
[VkSamplerCreateInfo](VkSamplerCreateInfo.html) structure on a [VkDevice](VkDevice.html) created from the
same [VkPhysicalDevice](VkPhysicalDevice.html) with identical parameters will always return the
same bit pattern.

|  | YCBCR samplers must be embedded in a shader by using
| --- | --- |
[VkShaderDescriptorSetAndBindingMappingInfoEXT](VkShaderDescriptorSetAndBindingMappingInfoEXT.html), they cannot be
specified here. |

Valid Usage

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-descriptorHeap-11202) VUID-vkWriteSamplerDescriptorsEXT-descriptorHeap-11202

The [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) feature **must** be
enabled

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-size-11203) VUID-vkWriteSamplerDescriptorsEXT-size-11203

The `size` member of each element of `pDescriptors` **must** be
greater than or equal to the value returned by
[vkGetPhysicalDeviceDescriptorSizeEXT](vkGetPhysicalDeviceDescriptorSizeEXT.html) with a `descriptorType`
equal to [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html)

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-pSamplers-11204) VUID-vkWriteSamplerDescriptorsEXT-pSamplers-11204

Elements of `pSamplers` **must** not include
[VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html) structures in their `pNext`
chains

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-borderColor-11444) VUID-vkWriteSamplerDescriptorsEXT-borderColor-11444

If the `borderColor` of any element of `pSamplers` is
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html),
[VkSamplerCustomBorderColorIndexCreateInfoEXT](VkSamplerCustomBorderColorIndexCreateInfoEXT.html) **must** be included in
the `pNext` chain of that element

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-borderColor-11205) VUID-vkWriteSamplerDescriptorsEXT-borderColor-11205

If the `borderColor` of any element of `pSamplers` is
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html),
[VkSamplerCustomBorderColorIndexCreateInfoEXT](VkSamplerCustomBorderColorIndexCreateInfoEXT.html)::`index` **must** be
a value less than [    `maxCustomBorderColorSamplers`](../../../../spec/latest/chapters/limits.html#limits-maxCustomBorderColorSamplers)

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-pNext-11400) VUID-vkWriteSamplerDescriptorsEXT-pNext-11400

If there is a [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html) structure in the
`pNext` chain of any element of `pSamplers`, its
`objectType` **must** be [VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html)

Valid Usage (Implicit)

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-device-parameter) VUID-vkWriteSamplerDescriptorsEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-pSamplers-parameter) VUID-vkWriteSamplerDescriptorsEXT-pSamplers-parameter

 `pSamplers` **must** be a valid pointer to an array of `samplerCount` valid [VkSamplerCreateInfo](VkSamplerCreateInfo.html) structures

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-pDescriptors-parameter) VUID-vkWriteSamplerDescriptorsEXT-pDescriptors-parameter

 `pDescriptors` **must** be a valid pointer to an array of `samplerCount` valid [VkHostAddressRangeEXT](VkHostAddressRangeEXT.html) structures

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-samplerCount-arraylength) VUID-vkWriteSamplerDescriptorsEXT-samplerCount-arraylength

 `samplerCount` **must** be greater than `0`

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

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDevice](VkDevice.html), [VkHostAddressRangeEXT](VkHostAddressRangeEXT.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#vkWriteSamplerDescriptorsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
