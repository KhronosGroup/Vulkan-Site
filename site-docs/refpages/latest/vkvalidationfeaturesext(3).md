# VkValidationFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkValidationFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkValidationFeaturesEXT - Specify validation features to enable or disable for a Vulkan instance

When creating a Vulkan instance for which you wish to enable or disable
specific validation features, add a [VkValidationFeaturesEXT](#) structure
to the `pNext` chain of the [VkInstanceCreateInfo](VkInstanceCreateInfo.html) structure,
specifying the features to be enabled or disabled.

// Provided by VK_EXT_validation_features
typedef struct VkValidationFeaturesEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    uint32_t                                enabledValidationFeatureCount;
    const VkValidationFeatureEnableEXT*     pEnabledValidationFeatures;
    uint32_t                                disabledValidationFeatureCount;
    const VkValidationFeatureDisableEXT*    pDisabledValidationFeatures;
} VkValidationFeaturesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`enabledValidationFeatureCount` is the number of features to enable.

* 
`pEnabledValidationFeatures` is a pointer to an array of
[VkValidationFeatureEnableEXT](VkValidationFeatureEnableEXT.html) values specifying the validation
features to be enabled.

* 
`disabledValidationFeatureCount` is the number of features to
disable.

* 
`pDisabledValidationFeatures` is a pointer to an array of
[VkValidationFeatureDisableEXT](VkValidationFeatureDisableEXT.html) values specifying the validation
features to be disabled.

Valid Usage

* 
[](#VUID-VkValidationFeaturesEXT-pEnabledValidationFeatures-02967) VUID-VkValidationFeaturesEXT-pEnabledValidationFeatures-02967

If the `pEnabledValidationFeatures` array contains
[VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_RESERVE_BINDING_SLOT_EXT](VkValidationFeatureEnableEXT.html),
then it **must** also contain
[VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_EXT](VkValidationFeatureEnableEXT.html) or
[VK_VALIDATION_FEATURE_ENABLE_DEBUG_PRINTF_EXT](VkValidationFeatureEnableEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkValidationFeaturesEXT-sType-sType) VUID-VkValidationFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VALIDATION_FEATURES_EXT](VkStructureType.html)

* 
[](#VUID-VkValidationFeaturesEXT-pEnabledValidationFeatures-parameter) VUID-VkValidationFeaturesEXT-pEnabledValidationFeatures-parameter

 If `enabledValidationFeatureCount` is not `0`, `pEnabledValidationFeatures` **must** be a valid pointer to an array of `enabledValidationFeatureCount` valid [VkValidationFeatureEnableEXT](VkValidationFeatureEnableEXT.html) values

* 
[](#VUID-VkValidationFeaturesEXT-pDisabledValidationFeatures-parameter) VUID-VkValidationFeaturesEXT-pDisabledValidationFeatures-parameter

 If `disabledValidationFeatureCount` is not `0`, `pDisabledValidationFeatures` **must** be a valid pointer to an array of `disabledValidationFeatureCount` valid [VkValidationFeatureDisableEXT](VkValidationFeatureDisableEXT.html) values

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](VkInstanceCreateInfo.html)

* 
[VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html)

* 
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html)

[VK_EXT_validation_features](VK_EXT_validation_features.html), [VkStructureType](VkStructureType.html), [VkValidationFeatureDisableEXT](VkValidationFeatureDisableEXT.html), [VkValidationFeatureEnableEXT](VkValidationFeatureEnableEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkValidationFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
