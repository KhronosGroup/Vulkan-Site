# VkBlockMatchWindowCompareModeQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBlockMatchWindowCompareModeQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBlockMatchWindowCompareModeQCOM - Block match window compare modes

The [VkBlockMatchWindowCompareModeQCOM](#) enum describes how block match
values within the window are compared.
[VkBlockMatchWindowCompareModeQCOM](#) is defined as:

// Provided by VK_QCOM_image_processing2
typedef enum VkBlockMatchWindowCompareModeQCOM {
    VK_BLOCK_MATCH_WINDOW_COMPARE_MODE_MIN_QCOM = 0,
    VK_BLOCK_MATCH_WINDOW_COMPARE_MODE_MAX_QCOM = 1,
} VkBlockMatchWindowCompareModeQCOM;

* 
[VK_BLOCK_MATCH_WINDOW_COMPARE_MODE_MIN_QCOM](#) specifies that
windowed block match operations return the minimum error within the
window.

* 
[VK_BLOCK_MATCH_WINDOW_COMPARE_MODE_MAX_QCOM](#) specifies that
windowed block match operations return the maximum error within the
window.

[VK_QCOM_image_processing2](VK_QCOM_image_processing2.html), [VkSamplerBlockMatchWindowCreateInfoQCOM](VkSamplerBlockMatchWindowCreateInfoQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkBlockMatchWindowCompareModeQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
