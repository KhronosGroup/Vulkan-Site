# VkShaderFloatControlsIndependence(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderFloatControlsIndependence.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderFloatControlsIndependence - Bitmask specifying whether, and how, shader float controls can be set separately

Values which **may** be returned in the `denormBehaviorIndependence` and
`roundingModeIndependence` fields of
`VkPhysicalDeviceFloatControlsProperties` are:

// Provided by VK_VERSION_1_2
typedef enum VkShaderFloatControlsIndependence {
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY = 0,
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_ALL = 1,
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE = 2,
  // Provided by VK_KHR_shader_float_controls
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY_KHR = VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY,
  // Provided by VK_KHR_shader_float_controls
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_ALL_KHR = VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_ALL,
  // Provided by VK_KHR_shader_float_controls
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE_KHR = VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE,
} VkShaderFloatControlsIndependence;

// Provided by VK_KHR_shader_float_controls
// Equivalent to VkShaderFloatControlsIndependence
typedef VkShaderFloatControlsIndependence VkShaderFloatControlsIndependenceKHR;

* 
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY](#) specifies that
shader float controls for 32-bit floating-point **can** be set
independently; other bit widths **must** be set identically to each other.

* 
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_ALL](#) specifies that shader
float controls for all bit widths **can** be set independently.

* 
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE](#) specifies that shader
float controls for all bit widths **must** be set identically.

[VK_KHR_shader_float_controls](VK_KHR_shader_float_controls.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkPhysicalDeviceFloatControlsProperties](VkPhysicalDeviceFloatControlsProperties.html), [VkPhysicalDeviceVulkan12Properties](VkPhysicalDeviceVulkan12Properties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkShaderFloatControlsIndependence).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
