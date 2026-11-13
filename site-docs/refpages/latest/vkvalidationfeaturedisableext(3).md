# VkValidationFeatureDisableEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkValidationFeatureDisableEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkValidationFeatureDisableEXT - Specify validation features to disable

Possible values of elements of the
[VkValidationFeaturesEXT](VkValidationFeaturesEXT.html)::`pDisabledValidationFeatures` array,
specifying validation features to be disabled, are:

// Provided by VK_EXT_validation_features
typedef enum VkValidationFeatureDisableEXT {
    VK_VALIDATION_FEATURE_DISABLE_ALL_EXT = 0,
    VK_VALIDATION_FEATURE_DISABLE_SHADERS_EXT = 1,
    VK_VALIDATION_FEATURE_DISABLE_THREAD_SAFETY_EXT = 2,
    VK_VALIDATION_FEATURE_DISABLE_API_PARAMETERS_EXT = 3,
    VK_VALIDATION_FEATURE_DISABLE_OBJECT_LIFETIMES_EXT = 4,
    VK_VALIDATION_FEATURE_DISABLE_CORE_CHECKS_EXT = 5,
    VK_VALIDATION_FEATURE_DISABLE_UNIQUE_HANDLES_EXT = 6,
    VK_VALIDATION_FEATURE_DISABLE_SHADER_VALIDATION_CACHE_EXT = 7,
} VkValidationFeatureDisableEXT;

* 
[VK_VALIDATION_FEATURE_DISABLE_ALL_EXT](#) specifies that all
validation checks are disabled.

* 
[VK_VALIDATION_FEATURE_DISABLE_SHADERS_EXT](#) specifies that shader
validation, both runtime and standalone, is disabled.
This validation occurs inside
[VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html) and
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html).
This feature is enabled by default.

* 
[VK_VALIDATION_FEATURE_DISABLE_THREAD_SAFETY_EXT](#) specifies that
thread safety validation is disabled.
This feature is enabled by default.

* 
[VK_VALIDATION_FEATURE_DISABLE_API_PARAMETERS_EXT](#) specifies that
stateless parameter validation is disabled.
This feature is enabled by default.

* 
[VK_VALIDATION_FEATURE_DISABLE_OBJECT_LIFETIMES_EXT](#) specifies that
object lifetime validation is disabled.
This feature is enabled by default.

* 
[VK_VALIDATION_FEATURE_DISABLE_CORE_CHECKS_EXT](#) specifies that core
validation checks are disabled.
This feature is enabled by default.
If this feature is disabled,
[VK_VALIDATION_FEATURE_DISABLE_SHADERS_EXT](#) is implied.

* 
[VK_VALIDATION_FEATURE_DISABLE_UNIQUE_HANDLES_EXT](#) specifies that
protection against duplicate non-dispatchable object handles is
disabled.
This feature is enabled by default.

* 
[VK_VALIDATION_FEATURE_DISABLE_SHADER_VALIDATION_CACHE_EXT](#)
specifies that there will be no caching of shader validation results and
every shader will be validated on every application execution.
Shader validation caching is enabled by default.

[VK_EXT_validation_features](VK_EXT_validation_features.html), [VkValidationFeaturesEXT](VkValidationFeaturesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkValidationFeatureDisableEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
