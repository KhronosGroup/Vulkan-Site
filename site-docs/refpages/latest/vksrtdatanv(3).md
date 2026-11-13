# VkSRTDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSRTDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSRTDataNV - Structure specifying a transform in SRT decomposition

An acceleration structure SRT transform is defined by the structure:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkSRTDataNV {
    float    sx;
    float    a;
    float    b;
    float    pvx;
    float    sy;
    float    c;
    float    pvy;
    float    sz;
    float    pvz;
    float    qx;
    float    qy;
    float    qz;
    float    qw;
    float    tx;
    float    ty;
    float    tz;
} VkSRTDataNV;

* 
`sx` is the x component of the scale of the transform

* 
`a` is one component of the shear for the transform

* 
`b` is one component of the shear for the transform

* 
`pvx` is the x component of the pivot point of the transform

* 
`sy` is the y component of the scale of the transform

* 
`c` is one component of the shear for the transform

* 
`pvy` is the y component of the pivot point of the transform

* 
`sz` is the z component of the scale of the transform

* 
`pvz` is the z component of the pivot point of the transform

* 
`qx` is the x component of the rotation quaternion

* 
`qy` is the y component of the rotation quaternion

* 
`qz` is the z component of the rotation quaternion

* 
`qw` is the w component of the rotation quaternion

* 
`tx` is the x component of the post-rotation translation

* 
`ty` is the y component of the post-rotation translation

* 
`tz` is the z component of the post-rotation translation

This transform decomposition consists of three elements.
The first is a matrix S, consisting of a scale, shear, and translation,
usually used to define the pivot point of the following rotation.
This matrix is constructed from the parameters above by:

  

  

The rotation quaternion is defined as:

`R` = [ `qx`, `qy`, `qz`, `qw` ]

This is a rotation around a conceptual normalized axis [ ax, ay, az ]
of amount `theta` such that:

[ `qx`, `qy`, `qz` ] = sin(`theta`/2)
× [ `ax`, `ay`, `az` ]

and

`qw` = cos(`theta`/2)

Finally, the transform has a translation T constructed from the parameters
above by:

  

  

The effective derived transform is then given by

`T` × `R` × `S`

[VK_NV_ray_tracing_motion_blur](VK_NV_ray_tracing_motion_blur.html), [VkAccelerationStructureSRTMotionInstanceNV](VkAccelerationStructureSRTMotionInstanceNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkSRTDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
