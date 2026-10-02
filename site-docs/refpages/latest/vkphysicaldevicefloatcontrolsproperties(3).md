# VkPhysicalDeviceFloatControlsProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFloatControlsProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFloatControlsProperties - Structure describing properties supported by VK_KHR_shader_float_controls

The `VkPhysicalDeviceFloatControlsProperties` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceFloatControlsProperties {
    VkStructureType                      sType;
    void*                                pNext;
    VkShaderFloatControlsIndependence    denormBehaviorIndependence;
    VkShaderFloatControlsIndependence    roundingModeIndependence;
    VkBool32                             shaderSignedZeroInfNanPreserveFloat16;
    VkBool32                             shaderSignedZeroInfNanPreserveFloat32;
    VkBool32                             shaderSignedZeroInfNanPreserveFloat64;
    VkBool32                             shaderDenormPreserveFloat16;
    VkBool32                             shaderDenormPreserveFloat32;
    VkBool32                             shaderDenormPreserveFloat64;
    VkBool32                             shaderDenormFlushToZeroFloat16;
    VkBool32                             shaderDenormFlushToZeroFloat32;
    VkBool32                             shaderDenormFlushToZeroFloat64;
    VkBool32                             shaderRoundingModeRTEFloat16;
    VkBool32                             shaderRoundingModeRTEFloat32;
    VkBool32                             shaderRoundingModeRTEFloat64;
    VkBool32                             shaderRoundingModeRTZFloat16;
    VkBool32                             shaderRoundingModeRTZFloat32;
    VkBool32                             shaderRoundingModeRTZFloat64;
} VkPhysicalDeviceFloatControlsProperties;

// Provided by VK_KHR_shader_float_controls
// Equivalent to VkPhysicalDeviceFloatControlsProperties
typedef VkPhysicalDeviceFloatControlsProperties VkPhysicalDeviceFloatControlsPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`denormBehaviorIndependence` is a
[VkShaderFloatControlsIndependence](VkShaderFloatControlsIndependence.html) value indicating whether, and
how, denorm behavior can be set independently for different bit widths.

* 

`roundingModeIndependence` is a
[VkShaderFloatControlsIndependence](VkShaderFloatControlsIndependence.html) value indicating whether, and
how, rounding modes can be set independently for different bit widths.

* 

`shaderSignedZeroInfNanPreserveFloat16` is a boolean value
indicating whether sign of a zero, Nans and
   **can** be preserved in 16-bit floating-point
computations.
It also indicates whether the `SignedZeroInfNanPreserve` execution
mode **can** be used for 16-bit floating-point types.

* 

`shaderSignedZeroInfNanPreserveFloat32` is a boolean value
indicating whether sign of a zero, Nans and
   **can** be preserved in 32-bit floating-point
computations.
It also indicates whether the `SignedZeroInfNanPreserve` execution
mode **can** be used for 32-bit floating-point types.

* 

`shaderSignedZeroInfNanPreserveFloat64` is a boolean value
indicating whether sign of a zero, Nans and
   **can** be preserved in 64-bit floating-point
computations.
It also indicates whether the `SignedZeroInfNanPreserve` execution
mode **can** be used for 64-bit floating-point types.

* 

`shaderDenormPreserveFloat16` is a boolean value indicating whether
denormals **can** be preserved in 16-bit floating-point computations.
It also indicates whether the `DenormPreserve` execution mode **can** be
used for 16-bit floating-point types.

* 

`shaderDenormPreserveFloat32` is a boolean value indicating whether
denormals **can** be preserved in 32-bit floating-point computations.
It also indicates whether the `DenormPreserve` execution mode **can** be
used for 32-bit floating-point types.

* 

`shaderDenormPreserveFloat64` is a boolean value indicating whether
denormals **can** be preserved in 64-bit floating-point computations.
It also indicates whether the `DenormPreserve` execution mode **can** be
used for 64-bit floating-point types.

* 

`shaderDenormFlushToZeroFloat16` is a boolean value indicating
whether denormals **can** be flushed to zero in 16-bit floating-point
computations.
It also indicates whether the `DenormFlushToZero` execution mode **can**
be used for 16-bit floating-point types.

* 

`shaderDenormFlushToZeroFloat32` is a boolean value indicating
whether denormals **can** be flushed to zero in 32-bit floating-point
computations.
It also indicates whether the `DenormFlushToZero` execution mode **can**
be used for 32-bit floating-point types.

* 

`shaderDenormFlushToZeroFloat64` is a boolean value indicating
whether denormals **can** be flushed to zero in 64-bit floating-point
computations.
It also indicates whether the `DenormFlushToZero` execution mode **can**
be used for 64-bit floating-point types.

* 

`shaderRoundingModeRTEFloat16` is a boolean value indicating whether
an implementation supports the round-to-nearest-even rounding mode for
16-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTE` execution mode **can**
be used for 16-bit floating-point types.

* 

`shaderRoundingModeRTEFloat32` is a boolean value indicating whether
an implementation supports the round-to-nearest-even rounding mode for
32-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTE` execution mode **can**
be used for 32-bit floating-point types.

* 

`shaderRoundingModeRTEFloat64` is a boolean value indicating whether
an implementation supports the round-to-nearest-even rounding mode for
64-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTE` execution mode **can**
be used for 64-bit floating-point types.

* 

`shaderRoundingModeRTZFloat16` is a boolean value indicating whether
an implementation supports the round-towards-zero rounding mode for
16-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTZ` execution mode **can**
be used for 16-bit floating-point types.

* 

`shaderRoundingModeRTZFloat32` is a boolean value indicating whether
an implementation supports the round-towards-zero rounding mode for
32-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTZ` execution mode **can**
be used for 32-bit floating-point types.

* 

`shaderRoundingModeRTZFloat64` is a boolean value indicating whether
an implementation supports the round-towards-zero rounding mode for
64-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTZ` execution mode **can**
be used for 64-bit floating-point types.

If the `VkPhysicalDeviceFloatControlsProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFloatControlsProperties-sType-sType) VUID-VkPhysicalDeviceFloatControlsProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FLOAT_CONTROLS_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_shader_float_controls](VK_KHR_shader_float_controls.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), `VkBool32`, [VkShaderFloatControlsIndependence](VkShaderFloatControlsIndependence.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceFloatControlsProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
