
const flexMessage = (data,approverData,description,userId) => {

  const flexMessage = {
    "to": userId, // Replace with the actual userId or groupId
    "messages": [
        {
            "type": "flex",
            "altText": "แจ้งเตือนงานในโครงการ",
            "contents": {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": "https://api.hugsangbaan.com/files/LINE_ALBUM_240211_12.jpg",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                        "type": "uri",
                        "uri": "https://tracking.hugsangbaan.com/"
                    }
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "แจ้งเตือน",
                            "weight": "bold",
                            "size": "xl"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "margin": "lg",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": `งานส่งกลับแก้ไชโดย: ${approverData.firstname} ${approverData.lastname}`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": `รายละเอียด: ${description}`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": `งาน: ${data.houseDetailname.houseDetailName}`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                  "type": "box",
                                  "layout": "baseline",
                                  "spacing": "sm",
                                  "contents": [
                                      {
                                          "type": "text",
                                          "text": `งานหลัก: ${data.periodDetail.periodname.periodName}`,
                                          "wrap": true,
                                          "color": "#666666",
                                          "size": "sm",
                                          "flex": 5
                                      }
                                  ]
                              },
                              {
                                "type": "box",
                                "layout": "baseline",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": `โครงการ: ${data.periodDetail.period.project.projectCode} ${data.periodDetail.period.project.projectName}`,
                                        "wrap": true,
                                        "color": "#666666",
                                        "size": "sm",
                                        "flex": 5
                                    }
                                ]
                            },
                            {
                              "type": "box",
                              "layout": "baseline",
                              "spacing": "sm",
                              "contents": [
                                  {
                                      "type": "text",
                                      "text": `งวด: ${data.periodDetail.period.description}`,
                                      "wrap": true,
                                      "color": "#666666",
                                      "size": "sm",
                                      "flex": 5
                                  }
                              ]
                          },
                            ]
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "button",
                            "style": "link",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "WEBSITE",
                                "uri": "https://tracking.hugsangbaan.com/"
                            }
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "margin": "sm"
                        }
                    ],
                    "flex": 0
                }
            }
        }
    ]
};
    return flexMessage;
}

const flexMessageSendApprove = (data,requestData,description,userId) => {

  const flexMessage = {
    "to": userId, // Replace with the actual userId or groupId
    "messages": [
        {
            "type": "flex",
            "altText": "แจ้งเตือนงานในโครงการ",
            "contents": {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": "https://api.hugsangbaan.com/files/LINE_ALBUM_240211_12.jpg",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                        "type": "uri",
                        "uri": "https://tracking.hugsangbaan.com/"
                    }
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "แจ้งเตือน",
                            "weight": "bold",
                            "size": "xl"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "margin": "lg",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": ` งานขออนุมัติโดย :${requestData.firstname} ${requestData.lastname}`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": `รายละเอียด : ${description}`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": `งาน : ${data.houseDetailname.houseDetailName} งานหลัก :${data.periodDetail.periodname.periodName}`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                  "type": "box",
                                  "layout": "baseline",
                                  "spacing": "sm",
                                  "contents": [
                                      {
                                          "type": "text",
                                          "text": `โครงการ :${data.periodDetail.period.project.projectCode} ${data.periodDetail.period.project.projectName}`,
                                          "wrap": true,
                                          "color": "#666666",
                                          "size": "sm",
                                          "flex": 5
                                      }
                                  ]
                              },
                              {
                                "type": "box",
                                "layout": "baseline",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": `งวด : ${data.periodDetail.period.description}`,
                                        "wrap": true,
                                        "color": "#666666",
                                        "size": "sm",
                                        "flex": 5
                                    }
                                ]
                            }
                            ]
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "button",
                            "style": "link",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "WEBSITE",
                                "uri": "https://tracking.hugsangbaan.com/"
                            }
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "margin": "sm"
                        }
                    ],
                    "flex": 0
                }
            }
        }
    ]
};
    return flexMessage;
}

const flexMessageApprove  = (data,approverData,description,userId) => {

  const flexMessage = {
    "to": userId, // Replace with the actual userId or groupId
    "messages": [
        {
            "type": "flex",
            "altText": "แจ้งเตือนงานในโครงการ",
            "contents": {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": "https://api.hugsangbaan.com/files/LINE_ALBUM_240211_12.jpg",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                        "type": "uri",
                        "uri": "https://tracking.hugsangbaan.com/"
                    }
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "แจ้งเตือน",
                            "weight": "bold",
                            "size": "xl"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "margin": "lg",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": `งานอนุมัติโดย: ${approverData.firstname} ${approverData.lastname}`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": `รายละเอียด: ${description}`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": `งาน: ${data.houseDetailname.houseDetailName}`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                  "type": "box",
                                  "layout": "baseline",
                                  "spacing": "sm",
                                  "contents": [
                                      {
                                          "type": "text",
                                          "text": `งานหลัก: ${data.periodDetail.periodname.periodName}`,
                                          "wrap": true,
                                          "color": "#666666",
                                          "size": "sm",
                                          "flex": 5
                                      }
                                  ]
                              },
                              {
                                "type": "box",
                                "layout": "baseline",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": `โครงการ: ${data.periodDetail.period.project.projectCode} ${data.periodDetail.period.project.projectName}`,
                                        "wrap": true,
                                        "color": "#666666",
                                        "size": "sm",
                                        "flex": 5
                                    }
                                ]
                            },
                            {
                              "type": "box",
                              "layout": "baseline",
                              "spacing": "sm",
                              "contents": [
                                  {
                                      "type": "text",
                                      "text": `งวด: ${data.periodDetail.period.description}`,
                                      "wrap": true,
                                      "color": "#666666",
                                      "size": "sm",
                                      "flex": 5
                                  }
                              ]
                          },
                            ]
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "button",
                            "style": "link",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "WEBSITE",
                                "uri": "https://tracking.hugsangbaan.com/"
                            }
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "margin": "sm"
                        }
                    ],
                    "flex": 0
                }
            }
        }
    ]
};
    return flexMessage;
}

const flexMessageSendReport = (data,customerData,id) => {

  const flexMessage = {
    "to": customerData.customerLine, // Replace with the actual userId or groupId
    "messages": [
        {
            "type": "flex",
            "altText": "แจ้งเตือนงานในโครงการ",
            "contents": {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": "https://api.hugsangbaan.com/files/LINE_ALBUM_240211_12.jpg",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": {
                        "type": "uri",
                        "uri": "https://tracking.hugsangbaan.com/"
                    }
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "แจ้งเตือน",
                            "weight": "bold",
                            "size": "xl"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "margin": "lg",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": ` เรียนคุณ: ${customerData.customerFirstname} ${customerData.customerLastname}`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": `บริษัทขอส่งรายงานความคืบหน้างาน`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": `งาน: ${data.houseDetailname.houseDetailName}`,
                                            "wrap": true,
                                            "color": "#666666",
                                            "size": "sm",
                                            "flex": 5
                                        }
                                    ]
                                },
                                {
                                  "type": "box",
                                  "layout": "baseline",
                                  "spacing": "sm",
                                  "contents": [
                                      {
                                          "type": "text",
                                          "text": `งานหลัก: ${data.periodDetail.periodname.periodName}`,
                                          "wrap": true,
                                          "color": "#666666",
                                          "size": "sm",
                                          "flex": 5
                                      }
                                  ]
                              },
                              {
                                "type": "box",
                                "layout": "baseline",
                                "spacing": "sm",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": `โครงการ: ${data.periodDetail.period.project.projectCode} ${data.periodDetail.period.project.projectName}`,
                                        "wrap": true,
                                        "color": "#666666",
                                        "size": "sm",
                                        "flex": 5
                                    }
                                ]
                            },
                            {
                              "type": "box",
                              "layout": "baseline",
                              "spacing": "sm",
                              "contents": [
                                  {
                                      "type": "text",
                                      "text": `งวด: ${data.periodDetail.period.description}`,
                                      "wrap": true,
                                      "color": "#666666",
                                      "size": "sm",
                                      "flex": 5
                                  }
                              ]
                          },
                          {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": `สามารถตรวจสอบรายละเอียดได้ที่`,
                                    "wrap": true,
                                    "color": "#666666",
                                    "size": "sm",
                                    "flex": 5
                                }
                            ]
                        },
                            ]
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "button",
                            "style": "link",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "WEBSITE",
                                "uri": `http://hsb.hugsangbaan.com/report/${id}`
                            }
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "margin": "sm"
                        }
                    ],
                    "flex": 0
                }
            }
        }
    ]
};
    return flexMessage;
}
module.exports = {

  flexMessage,
  flexMessageSendApprove,
  flexMessageApprove,
  flexMessageSendReport
    
}