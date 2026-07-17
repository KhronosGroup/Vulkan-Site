# VkValidationFeatureEnableEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkValidationFeatureEnableEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkValidationFeatureEnableEXT - Specify validation features to enable

Possible values of elements of the
[VkValidationFeaturesEXT](VkValidationFeaturesEXT.html)::`pEnabledValidationFeatures` array,
specifying validation features to be enabled, are:

// Provided by VK_EXT_validation_features
typedef enum VkValidationFeatureEnableEXT {
    VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_EXT = 0,
    VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_RESERVE_BINDING_SLOT_EXT = 1,
    VK_VALIDATION_FEATURE_ENABLE_BEST_PRACTICES_EXT = 2,
    VK_VALIDATION_FEATURE_ENABLE_DEBUG_PRINTF_EXT = 3,
    VK_VALIDATION_FEATURE_ENABLE_SYNCHRONIZATION_VALIDATION_EXT = 4,
} VkValidationFeatureEnableEXT;

* 
[VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_EXT](#) specifies that
GPU-assisted validation is enabled.
Activating this feature instruments shader programs to generate
additional diagnostic data.
This feature is disabled by default.

* 
[VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_RESERVE_BINDING_SLOT_EXT](#)
specifies that the validation layers reserve a descriptor set binding
slot for their own use.
The layer reports a value for
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxBoundDescriptorSets` that is one
less than the value reported by the device.
If the device supports the binding of only one descriptor set, the
validation layer does not perform GPU-assisted validation.
This feature is disabled by default.

* 
[VK_VALIDATION_FEATURE_ENABLE_BEST_PRACTICES_EXT](#) specifies that
Vulkan best-practices validation is enabled.
Activating this feature enables the output of warnings related to common
misuse of the API, but which are not explicitly prohibited by the
specification.
This feature is disabled by default.

* 
[VK_VALIDATION_FEATURE_ENABLE_DEBUG_PRINTF_EXT](#) specifies that the
layers will process `debugPrintfEXT` operations in shaders and send
the resulting output to the debug callback.
This feature is disabled by default.

* 
[VK_VALIDATION_FEATURE_ENABLE_SYNCHRONIZATION_VALIDATION_EXT](#)
specifies that Vulkan synchronization validation is enabled.
This feature reports resource access conflicts due to missing or
incorrect synchronization operations between actions (Draw, Copy,
Dispatch, Blit) reading or writing the same regions of memory.
This feature is disabled by default.

[VK_EXT_validation_features](VK_EXT_validation_features.html), [VkValidationFeaturesEXT](VkValidationFeaturesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkValidationFeatureEnableEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
